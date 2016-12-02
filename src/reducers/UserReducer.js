import {
	USER_ACCEPT_ERROR,
	FETCH_USER_DATA,
	USER_NOT_IN_RANGE,
	SIGN_OUT
} from '../actions/types';

const INITIAL_STATE = { admin: false, error: false };

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_USER_DATA:
			return action.payload;
		case USER_NOT_IN_RANGE:
			return { ...state, error: 'You must be at the party to check-in to the party.' };
		case USER_ACCEPT_ERROR:
			return { ...state, error: false };
		case SIGN_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
};
