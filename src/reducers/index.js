import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import PlacesReducer from './PlacesReducer';
import CommentListReducer from './CommentListReducer';

export default combineReducers({
	user: UserReducer,
	places: PlacesReducer,
	commentList: CommentListReducer,
});
