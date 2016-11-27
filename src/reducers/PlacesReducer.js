import {
	PLACES_FETCH_SUCCESS,
	PLACES_REFRESH,
	SIGN_OUT
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PLACES_FETCH_SUCCESS:
			return { ...state, [action.payload.key]: action.payload.data };
		case PLACES_REFRESH:
			return INITIAL_STATE;
		case SIGN_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
};
