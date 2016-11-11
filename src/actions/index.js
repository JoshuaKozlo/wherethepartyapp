import firebase from 'firebase';
import GeoFire from 'geofire';
import _ from 'lodash';
import {
	PLACES_FETCH_SUCCESS,
	USER_ACCEPT_ERROR,
	USER_NOT_IN_RANGE,
	COMMENTS_FETCH_SUCCESS,
	SELECT_PLACE,
	FETCH_USER_DATA
} from './types';

export const fetchUserData = () => {
	const { uid } = firebase.auth().currentUser;
	const userRef = firebase.database().ref(`/users/${uid}`);

	return (dispatch) => {
		userRef.on('value', (snapshot) => {
			dispatch({
				type: FETCH_USER_DATA,
				payload: snapshot.val()
			});
		});
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
		geoQuery.on('key_entered', (key) => {
			firebase.database().ref(`/places/${key}`)
				.on('value', snapshot => {
					const data = { ...snapshot.val(), id: snapshot.key };

					dispatch({ 
						type: PLACES_FETCH_SUCCESS, 
						payload: { key: snapshot.key, data } 
					});
				});
		});
	};
};

export const userCheckIn = (placeId = null) => {
	const { uid } = firebase.auth().currentUser;
	const userRef = firebase.database().ref(`/users/${uid}`);

	return () => {
		userRef.update({ place: placeId });
	};
};

function toggleCount(placeId, uid) {
	const placeRef = firebase.database().ref(`/places/${placeId}`);
	const checkInsRef = firebase.database().ref(`/checkIns/${placeId}`);

	placeRef.transaction((place) => {
		if (place) {
			if (place.count && place.checkIns) {
				place.count--;
				place.checkIns[uid] = null;
			} else {
				place.count++;
				if (!place.checkIns) {
					place.checkIns = {};
				}
				place.checkIns[uid] = true;
			}
		}
		return place;
	});
}

export const acceptError = () => {
	return {
		type: USER_ACCEPT_ERROR,
	};
};

export const commentsFetch = (place) => {
	const commentsRef = firebase.database().ref('/comments').child(place);
	return (dispatch) => {
		commentsRef.on('value', (data) => {
			dispatch({
				type: COMMENTS_FETCH_SUCCESS,
				payload: { key: data.key, data: data.val() }
			});
		});
	};
};

export const commentSubmit = (placeId, user, message) => {
	const commentsRef = firebase.database().ref('/comments').child(placeId);
	const name = `${user.first} ${user.last}`;
	return (dispatch) => {
		commentsRef.push({ message, name });
	};
};

export const selectPlace = (placeId) => {
	return {
		type: SELECT_PLACE,
		payload: placeId
	};
};

function checkDistance(pos1, pos2) {
	return GeoFire.distance([pos1.latitude, pos1.longitude], pos2) < 50;
}
