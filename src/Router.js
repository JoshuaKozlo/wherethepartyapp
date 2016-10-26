import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import PlaceList from './components/PlaceList';
import PlaceDetail from './components/PlaceDetail';

const RouterComponent = () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }}>
			<Scene key="main">
				<Scene key="placeList" component={PlaceList} initial />
				<Scene key="placeDetail" component={PlaceDetail} />
			</Scene>
		</Router>
	);
};

export default RouterComponent;
