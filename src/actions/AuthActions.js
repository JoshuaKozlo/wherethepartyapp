import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import {
	AUTH_ERROR,
	FETCH_USER_DATA,
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	MANAGED_FETCH_SUCCESS,
	SIGN_OUT,
	CANCEL_HANDLES
} from './types';

export const startAuthListener = () => {
	return (dispatch) => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log('login')
				dispatch(fetchUserData(user.uid));
				loginUserSuccess(dispatch, user);
			} else {
				dispatch({ type: SIGN_OUT });
				console.log('out')
				Actions.auth();
			}
		});
	};
};

export const loginUserSuccess = (user) => {
		return (dispatch) => {
			Actions.main();
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
		Actions.auth();
	};
};

export const signUpUser = ({ email, password, passwordConfirm, first, last }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });

		if (password === passwordConfirm) {
			if (first.length > 0 && last.length > 0) {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(user => {
						loginUserSuccess(dispatch, user);
						user.updateProfile({
							displayName: `${first} ${last}`
						});
						Actions.main();
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

// export const createUserData = (first, last) => {
// 	const user = firebase.auth().currentUser;
// 	return (dispatch) => {
// 		firebase.database().ref(`/users/${user.uid}`).set({ admin: false })
// 			.then(() => {
// 				dispatch(fetchUserData());
// 			});
// 		user.updateProfile({
// 			displayName: `${first} ${last}`
// 		});
// 	};
// };

export const fetchUserData = (uid) => {
	const userRef = firebase.database().ref(`/users/${uid}`);

	return (dispatch) => {
		userRef.on('value', (snapshot) => {
			if (snapshot.hasChild('admin')) {
				dispatch(fetchAdminData(snapshot.val().admin));
			}
			dispatch({
				type: FETCH_USER_DATA,
				payload: snapshot.val()
			});
		});
	};
};

const fetchAdminData = (places) => {
	return (dispatch) => {
		_.forOwn(places, (value, key) => {
			const placeRef = firebase.database().ref(`/places/${key}`).child('meta');
			placeRef.on('value', (snapshot) => {
				dispatch({
					type: MANAGED_FETCH_SUCCESS,
					payload: { [key]: snapshot.val() }
				});
			});
		});
	};
};

