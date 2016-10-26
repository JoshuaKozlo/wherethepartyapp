import firebase from 'firebase';
import GeoFire from 'geofire';
import {
	PLACES_FETCH_SUCCESS,
	USER_ACCEPT_ERROR,
	USER_CHECKIN_SUCCESS,
	USER_CHECKOUT_SUCCESS,
	USER_NOT_IN_RANGE,
	COMMENTS_FETCH_SUCCESS,
	SELECT_PLACE
} from './types';

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

export const userCheckIn = (checkIn, checkOut, out = false) => {
	const { currentUser } = firebase.auth();
	const database = firebase.database();
	const locationRef = database.ref('/geoplaces');
	const checkInRef = database.ref(`/places/${checkIn}/count`);
	const checkOutRef = database.ref(`/places/${checkOut}/count`);
	const userRef = database.ref(`/users/${currentUser.uid}`);
	const geoFire = new GeoFire(locationRef);

	return (dispatch) => {
		if (out) {
			checkOutRef.transaction(count => count - 1);
			userRef.child('place').remove().then(() => {
				dispatch({
					type: USER_CHECKOUT_SUCCESS
				});
			});
		} else {
			navigator.geolocation.getCurrentPosition(({ coords }) => {
				geoFire.get(checkIn).then((location) => {
					if (checkDistance(coords, location)) {
						checkInRef.transaction(count => count + 1);
						if (checkOut) { 
							checkOutRef.transaction(count => count - 1); 
						}
								
						userRef.update({ place: checkIn }).then(() => {
							dispatch({
								type: USER_CHECKIN_SUCCESS,
								payload: checkIn
							});
						});
					} else {
						dispatch({
							type: USER_NOT_IN_RANGE
						});
					}
				});
			});
		}
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
		commentsRef.on('value', (data) => {
			dispatch({
				type: COMMENTS_FETCH_SUCCESS,
				payload: { key: data.key, data: data.val() }
			});
		});
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
