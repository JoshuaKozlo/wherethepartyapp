import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';

class App extends Component {

	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyCYBRMrsJ8PymrJNFqCcFljlmYGLT8zwSE',
			authDomain: 'where-the-party-app.firebaseapp.com',
			databaseURL: 'https://where-the-party-app.firebaseio.com',
			storageBucket: 'where-the-party-app.appspot.com',
			messagingSenderId: '638126812285'
		});
	}

	render() {
		return (
			<Header headerText="Where The Party" />
		);
	}
}

export default App;
