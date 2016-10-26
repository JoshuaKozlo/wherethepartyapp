import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyCYBRMrsJ8PymrJNFqCcFljlmYGLT8zwSE',
			authDomain: 'where-the-party-app.firebaseapp.com',
			databaseURL: 'https://where-the-party-app.firebaseio.com',
			storageBucket: 'where-the-party-app.appspot.com',
			messagingSenderId: '638126812285'
		});
		// MUST REMOVE THIS LINE BEFORE DEPLOY
		firebase.auth().signInWithEmailAndPassword('test@test.com', 'password');
	}

	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;
