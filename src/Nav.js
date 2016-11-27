import React, { Component } from 'react';
import { Navigator, Text, TouchableHighlight } from 'react-native';
import Navigation from './components/Navigation';
import PlaceList from './components/PlaceList';

class Nav extends Component {
	renderScene(route, navigator) {
		if (route.name === 'First Scene') {
			return <Navigation />;
		}
		if (route.name === 'Second Scene') {
			return <PlaceList />;
		}
	}

	render() {
		const routes = [
			{ name: 'First Scene', index: 0 },
			{ name: 'Second Scene', index: 1 }
		];

		return (
			<Navigator
				initialRoute={routes[1]}
				initialRouteStack={routes}
				renderScene={this.renderScene}
			/>
		);
	}
}

export default Nav;
