import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import PlaceList from './components/PlaceList';
import PlaceDetail from './components/PlaceDetail';
import Navigation from './components/Navigation';

const RouterComponent = () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }}>
			<Scene 
				key="main" 
				rightButtonImage={require('./img/0879-menu7.png')} 
				onRight={() => Actions.nav()}
			>
				<Scene key="placeList" component={PlaceList} hideNavBar={false} />
				<Scene key="placeDetail" component={PlaceDetail} hideNavBar={false} />
				<Scene key="nav" component={Navigation} initial sceneStyle={{ paddingTop: 0 }} hideNavBar /> 
			</Scene>
		</Router>
	);
};

export default RouterComponent;
