import { combineReducers } from 'redux';
import UserPlaceReducer from './UserPlaceReducer';
import PlacesReducer from './PlacesReducer';
import CommentsReducer from './CommentsReducer';

export default combineReducers({
	userPlace: UserPlaceReducer,
	places: PlacesReducer,
	comments: CommentsReducer
});
