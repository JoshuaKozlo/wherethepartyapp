import React, { Component } from 'react';
import { Navigator, Text, Image, TouchableOpacity } from 'react-native';
import Navigation from './components/Navigation';
import PlaceList from './components/PlaceList';
import PlaceDetail from './components/PlaceDetail';
import PlaceManager from './components/PlaceManager';
import AuthPage from './components/AuthPage';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

class Nav extends Component {

	renderScene(route, navigator) {
		if (route.name === 'PlaceList') {
			return <PlaceList navigator={navigator} />;
		}
		if (route.name === 'Navigation') {
			return <Navigation navigator={navigator} />;
		}
		if (route.name === 'PlaceDetail') {
			return <PlaceDetail {...route.passProps} />;
		}
		if (route.name === 'PlaceManager') {
			return <PlaceManager {...route.passProps} />;
		}
		if (route.name === 'AuthPage') {
			return <AuthPage navigator={navigator} />;
		}
		if (route.name === 'SignIn') {
			return <SignInForm navigator={navigator} />;
		}
		if (route.name === 'SignUp') {
			return <SignUpForm />;
		}
	}

	animateScenes(route, routeStack) {
		return Navigator.SceneConfigs.FloatFromLeft;
	}

	render() {
		const routes = [
			{ name: 'Navigation', index: 0 },
			{ name: 'AuthPage', index: 1 },
			{ name: 'PlaceList', index: 2 }
		];

		const NavigationBarRouteMapper = {
			LeftButton(route, navigator, index, navState) {
				if (route.name === 'Navigation' || route.name === 'AuthPage' ||
					route.name === 'PlaceList') {
					return null;
				}
				return (
					<TouchableOpacity 
						style={styles.navRightStyles}
						onPress={() => navigator.pop()}
					>
						<Image source={require('./img/1220-arrow-left4.png')} />
					</TouchableOpacity>
				);
			},
			RightButton(route, navigator, index, navState) {
				if (route.name === 'PlaceList' || route.name === 'PlaceDetail' ||
					route.name === 'PlaceManager') {
					return (
						<TouchableOpacity 
							style={styles.navRightStyles}
							onPress={() => navigator.popToTop()}
						>
							<Image source={require('./img/0879-menu7.png')} />
						</TouchableOpacity>
					);
				}
				return null;
			},
			Title(route, navigator, index, navState) {
				return <Text style={styles.navTitleStyles}>Wtpa?</Text>;
			}
		};

		return (
			<Navigator
				initialRoute={routes[1]}
				initialRouteStack={routes}
				renderScene={this.renderScene}
				configureScene={this.animateScenes}
				navigationBar={
					<Navigator.NavigationBar
						style={styles.navStyles}
						routeMapper={NavigationBarRouteMapper}
					/>
				}
			/>
		);
	}
}

const styles = {
	navStyles: {
		backgroundColor: '#F1F1F1',
		borderBottomWidth: 0.5,
		borderBottomColor: 'rgba(0, 0, 0, .1)',
		height: 65
	},
	navLeftStyles: {
		padding: 10
	},
	navRightStyles: {
		padding: 10,
	},
	navTitleStyles: {
		fontFamily: 'yesteryear',
		fontSize: 20,
		padding: 5
	}
};

export default Nav;
