import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import PlaceList from './components/PlaceList';
import PlaceDetail from './components/PlaceDetail';
import PlaceManager from './components/PlaceManager';
import Navigation from './components/Navigation';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import AuthPage from './components/AuthPage';

const RouterComponent = () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }} title="Wtpa?" titleStyle={style.titleStyle}>
			<Scene key="auth" backButtonImage={require('./img/1220-arrow-left4.png')} initial>
				<Scene key="authPage" component={AuthPage} initial />
				<Scene 
					key="signIn" 
					component={SignInForm} 
					rightTitle="Sign Up" 
					onRight={() => Actions.signUp()}
					rightButtonTextStyle={style.signInStyle}
				/>
				<Scene 
					key="signUp" 
					component={SignUpForm} 
					rightTitle="Sign In" 
					onRight={() => Actions.signIn()}
					rightButtonTextStyle={style.signInStyle}
				/>
			</Scene>
			<Scene 
				key="main"
				unmountScenes
				backButtonImage={require('./img/1220-arrow-left4.png')} 
				rightButtonImage={require('./img/0879-menu7.png')}
				navigationBarStyle={{ backgroundColor: '#F1F1F1' }} 
				onRight={() => Actions.nav()}
			>
				<Scene key="placeList" component={PlaceList} hideNavBar={false} />
				<Scene key="placeDetail" component={PlaceDetail} hideNavBar={false} />
				<Scene key="placeManager" component={PlaceManager} hideNavBar={false} />
				<Scene key="nav" component={Navigation} sceneStyle={{ paddingTop: 0 }} hideNavBar initial /> 
			</Scene>
		</Router>
	);
};

const style = {
	titleStyle: {
		fontSize: 21,
		fontFamily: 'yesteryear'
	},
	signInStyle: {
		color: '#000',
		fontSize: 15
	}
};

export default RouterComponent;
