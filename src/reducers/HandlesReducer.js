import {
	HANDLE_ADDED,
	CANCEL_HANDLES
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HANDLE_ADDED:
			console.log(action.type, action.payload);
			return [...state, action.payload];
		case CANCEL_HANDLES:
			console.log('cancel');
			console.log(state);
			state.forEach((handle) => {
				console.log(handle);
				try {
					handle.off();
					console.log(1);
				} catch (e) {
					console.log(e);
					handle.cancel();
					console.log(2);
				} finally {
					console.log(handle);
					console.log(3);
				}
			});
			return INITIAL_STATE;
		default:
			return state;
	}
};
