import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';
import Nav from './Nav';
import { loginUserSuccess } from './actions';

class App extends Component {
	constructor() {
		super();
		this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
	}

	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyCYBRMrsJ8PymrJNFqCcFljlmYGLT8zwSE',
			authDomain: 'where-the-party-app.firebaseapp.com',
			databaseURL: 'https://where-the-party-app.firebaseio.com',
			storageBucket: 'where-the-party-app.appspot.com',
			messagingSenderId: '638126812285'
		});

		firebase.auth().signInWithEmailAndPassword('admin@test.com', 'password');

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log('logged in');
				this.store.dispatch(loginUserSuccess(user));
			} else {
				console.log('not logged in');
			}
		});
	}

	render() {
		return (
			<Provider store={this.store}>
				<Nav />
			</Provider>
		);
	}
}

export default App;
