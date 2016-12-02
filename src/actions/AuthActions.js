import firebase from 'firebase';
import {
	AUTH_ERROR,
	FETCH_USER_DATA,
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	MANAGED_FETCH_SUCCESS,
	SIGN_OUT,
	PLACE_HANDLE_ADDED,
	USER_HANDLE_ADDED,
	CANCEL_USER_HANDLE
} from './types';

export const loginUserSuccess = (user) => {
		return (dispatch) => {
			dispatch(fetchUserData(user.uid));
			dispatch({
				type: LOGIN_USER_SUCCESS,
				payload: user
			});
		};
};

export const signInUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });

		firebase.auth().signInWithEmailAndPassword(email, password)
			.catch(error => {
				dispatch({
					type: AUTH_ERROR,
					payload: error.message
				});
			});
	};
};

export const signOutUser = () => {
	return (dispatch) => {
		dispatch({ type: SIGN_OUT });
		firebase.auth().signOut();
	};
};

export const signUpUser = ({ email, password, passwordConfirm, first, last }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });

		if (password === passwordConfirm) {
			if (first.length > 0 && last.length > 0) {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(() => {
						dispatch(createUserData(first, last));
					}).catch(error => {
						dispatch({
							type: AUTH_ERROR,
							payload: error.message
						});
					});
			} else {
				dispatch({
					type: AUTH_ERROR,
					payload: 'All fields are required.'
				});
			}
		} else {
			dispatch({
				type: AUTH_ERROR,
				payload: 'Passwords must match.'
			});
		}
	};
};

export const createUserData = (first, last) => {
	const user = firebase.auth().currentUser;
	return () => {
		firebase.database().ref(`/users/${user.uid}`).set({ admin: false });
		user.updateProfile({
			displayName: `${first} ${last}`
		});
	};
};

export const fetchUserData = (uid) => {
	const userRef = firebase.database().ref(`/users/${uid}`);

	return (dispatch) => {
		userRef.on('value', (snapshot) => {
			dispatch({
				type: FETCH_USER_DATA,
				payload: snapshot.val()
			});
		});
		dispatch({ type: USER_HANDLE_ADDED, payload: userRef });
	};
};

export const cancelUserHandle = () => {
	return {
		type: CANCEL_USER_HANDLE
	};
};

export const fetchAdminData = (placeId) => {
	return (dispatch) => {
		const placeRef = firebase.database().ref(`/places/${placeId}`).child('meta');
		dispatch({ type: PLACE_HANDLE_ADDED, payload: placeRef });
		placeRef.on('value', (snapshot) => {
			dispatch({
				type: MANAGED_FETCH_SUCCESS,
				payload: snapshot.val()
			});
		});
	};
};

