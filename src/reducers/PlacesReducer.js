import {
	PLACES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PLACES_FETCH_SUCCESS:
			return { ...state, [action.payload.key]: action.payload.data };
		default:
			return state;
	}
};
