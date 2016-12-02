import {
	PLACE_HANDLE_ADDED,
	CANCEL_PLACE_HANDLES
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PLACE_HANDLE_ADDED:
			return [...state, action.payload];
		case CANCEL_PLACE_HANDLES:
			state.forEach((handle) => {
				if (handle.off) {
					handle.off();
				} else {
					handle.cancel();
				}
			});
			return INITIAL_STATE;
		default:
			return state;
	}
};
