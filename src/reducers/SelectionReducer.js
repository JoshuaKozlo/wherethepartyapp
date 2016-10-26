import {
	SELECT_PLACE
} from '../actions/types';

export default (state = null, action) => {
	switch (action.type) {
		case SELECT_PLACE:
			return action.payload;
		default:
			return state;
	}
};
