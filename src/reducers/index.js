import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import PlacesReducer from './PlacesReducer';
import CommentListReducer from './CommentListReducer';
import ManagedReducer from './ManagedReducer';
import AuthReducer from './AuthReducer';
import PlacesHandleReducer from './PlacesHandleReducer';
import CommentsHandleReducer from './CommentsHandleReducer';
import UserHandleReducer from './UserHandleReducer';

export default combineReducers({
	auth: AuthReducer,
	user: UserReducer,
	places: PlacesReducer,
	commentList: CommentListReducer,
	managed: ManagedReducer,
	placesHandles: PlacesHandleReducer,
	commentHandle: CommentsHandleReducer,
	userHandle: UserHandleReducer
});
