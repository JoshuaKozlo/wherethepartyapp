import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import PlacesReducer from './PlacesReducer';
import CommentListReducer from './CommentListReducer';
import ManagedReducer from './ManagedReducer';
import AuthReducer from './AuthReducer';
import HandlesReducer from './HandlesReducer';

export default combineReducers({
	auth: AuthReducer,
	user: UserReducer,
	places: PlacesReducer,
	commentList: CommentListReducer,
	managed: ManagedReducer,
	handles: HandlesReducer
});
