import firebase from 'firebase';
import GeoFire from 'geofire';
import {
	COMMENTS_FETCH_SUCCESS,
	PLACES_FETCH_SUCCESS,
	PLACES_REFRESH,
	USER_ACCEPT_ERROR,
	PLACE_HANDLE_ADDED,
	CANCEL_PLACE_HANDLES,
	COMMENT_HANDLE_ADDED,
	CANCEL_COMMENT_HANDLE
} from './types';

export const updateStatus = (placeID, status) => {
	const placeRef = firebase.database().ref(`places/${placeID}`).child('meta'); 
	return () => {
		placeRef.update({ status });
	};
};

export const placesFetch = (latitude, longitude) => {
	const locationRef = firebase.database().ref('/geoplaces');
	const geoFire = new GeoFire(locationRef);
	const geoQuery = geoFire.query({
		center: [latitude, longitude],
		radius: 20
	});
	return (dispatch) => {
		dispatch({ type: PLACE_HANDLE_ADDED, payload: geoQuery });
		geoQuery.on('key_entered', (key) => {
			const placeRef = firebase.database().ref(`/places/${key}`).child('meta');
				dispatch({ type: PLACE_HANDLE_ADDED, payload: placeRef });
				placeRef.on('value', snapshot => {
					const data = { ...snapshot.val(), id: key };
					dispatch({ 
						type: PLACES_FETCH_SUCCESS, 
						payload: { key, data } 
					});
				});
		});
	};
};

export const cancelPlaceHandles = () => {
	return {
		type: CANCEL_PLACE_HANDLES
	};
};

export const placesRefresh = (latitude, longitude) => {
	return (dispatch) => {
		console.log(latitude, longitude);
		dispatch({ type: PLACES_REFRESH });
		dispatch(placesFetch(latitude, longitude));
	};
};

export const userCheckIn = (placeId, previousId) => {
	const { uid } = firebase.auth().currentUser;
	const userRef = firebase.database().ref(`/users/${uid}`);

	return (dispatch) => {
		if (placeId === previousId) {
			// Just checking out
			userRef.update({ place: null });
			dispatch(toggleCount(placeId, uid));
		} else if (placeId && !previousId) {
			// Just checking in
			userRef.update({ place: placeId });
			dispatch(toggleCount(placeId, uid));
		} else {
			// Checking out and checking in
			userRef.update({ place: placeId });
			dispatch(toggleCount(placeId, uid));
			dispatch(toggleCount(previousId, uid));
		}
	};
};

export const toggleCount = (placeId, uid) => {
	const placeRef = firebase.database().ref('/places').child(placeId);
	return () => {
		placeRef.transaction((place) => {
			if (place) {
				if (place.checkIns && place.checkIns[uid]) {
					place.meta.count--;
					place.checkIns[uid] = null;
				} else {
					place.meta.count++;
					place.checkIns[uid] = true;
				}
			}
			return place;
		});
	};
};

export const acceptError = () => {
	return {
		type: USER_ACCEPT_ERROR,
	};
};

export const commentsFetch = (place) => {
	const commentsRef = firebase.database().ref('/comments').child(place);
	return (dispatch) => {
		dispatch({ type: COMMENT_HANDLE_ADDED, payload: commentsRef });
		commentsRef.on('value', (data) => {
			dispatch({
				type: COMMENTS_FETCH_SUCCESS,
				payload: { key: data.key, data: data.val() }
			});
		});
	};
};

export const cancelCommentsHandle = () => {
	return {
		type: CANCEL_COMMENT_HANDLE
	};
};

export const commentSubmit = (placeId, message, admin = false) => {
	const commentsRef = firebase.database().ref('/comments').child(placeId);
	const sender = !admin ? firebase.auth().currentUser.displayName : admin;
	return () => {
		commentsRef.push({ message, sender });
	};
};

export const commentDelete = (placeId, commentId) => {
	const commentRef = firebase.database().ref(`/comments/${placeId}`).child(commentId);
	return () => {
		commentRef.remove();
	};
};

function checkDistance(pos1, pos2) {
	return GeoFire.distance([pos1.latitude, pos1.longitude], pos2) < 50;
}
