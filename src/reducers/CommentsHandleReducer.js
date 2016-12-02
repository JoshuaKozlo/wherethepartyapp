import {
	COMMENT_HANDLE_ADDED,
	CANCEL_COMMENT_HANDLE
} from '../actions/types';

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case COMMENT_HANDLE_ADDED:
			return action.payload;
		case CANCEL_COMMENT_HANDLE:
			state.off();
			return false;
		default:
			return state;
	}
};
