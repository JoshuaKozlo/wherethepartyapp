import {
	USER_CHECKIN_SUCCESS,
	USER_CHECKOUT_SUCCESS,
	USER_ACCEPT_ERROR,
	USER_NOT_IN_RANGE
} from '../actions/types';

const INITIAL_STATE = { place: false, error: false };

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_CHECKIN_SUCCESS:
			return { place: action.payload, error: false };
		case USER_CHECKOUT_SUCCESS:
			return { place: false, error: false };
		case USER_NOT_IN_RANGE:
			return { ...state, error: 'You must be at the party to check-in to the party.' };
		case USER_ACCEPT_ERROR:
			return { ...state, error: false };
		default:
			return state;
	}
};
