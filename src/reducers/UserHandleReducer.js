import {
	USER_HANDLE_ADDED,
	CANCEL_USER_HANDLE
} from '../actions/types';

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_HANDLE_ADDED:
			return action.payload;
		case CANCEL_USER_HANDLE:
			state.off();
			return INITIAL_STATE;
		default:
			return state;
	}
};
