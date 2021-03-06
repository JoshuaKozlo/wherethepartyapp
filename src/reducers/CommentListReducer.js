import {
	COMMENTS_FETCH_SUCCESS,
	SIGN_OUT
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case COMMENTS_FETCH_SUCCESS:
			return action.payload.data;
		case SIGN_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
};
