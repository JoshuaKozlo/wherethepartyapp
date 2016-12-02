import {
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	AUTH_ERROR,
	SIGN_OUT
} from '../actions/types';

const INITIAL_STATE = {
	user: null,
	loading: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AUTH_ERROR:
			return { ...state, error: action.payload, loading: false };
		case LOGIN_USER:
			return { ...state, loading: true, error: '' };
		case LOGIN_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case SIGN_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
};
