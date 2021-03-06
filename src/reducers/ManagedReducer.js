import {
	MANAGED_FETCH_SUCCESS,
	SIGN_OUT
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MANAGED_FETCH_SUCCESS:
			console.log(action.payload);
			return action.payload;
		case SIGN_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
};
