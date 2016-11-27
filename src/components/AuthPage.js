import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class AuthPage extends Component {
	render() {
		const { containerStyles, innerContainerStyles,
			buttonStyles, buttonTextStyles
		} = styles;

		return (
			<View style={containerStyles}>
				<View style={innerContainerStyles}>
					<TouchableOpacity style={buttonStyles} onPress={() => Actions.signIn()}>
						<Text style={buttonTextStyles}>Sign In</Text>
					</TouchableOpacity>
					<TouchableOpacity style={buttonStyles} onPress={() => Actions.signUp()}>
						<Text style={buttonTextStyles}>Sign Up</Text>
					</TouchableOpacity>
					<TouchableOpacity style={buttonStyles}>
						<Text style={buttonTextStyles}>Just Checking In</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = {
	containerStyles: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	innerContainerStyles: {
		alignItems: 'center'
	},
	buttonStyles: {
		borderWidth: 1,
		borderColor: '#3D3D3D',
		borderRadius: 10,
		padding: 10,
		width: 150,
		margin: 10
	},
	buttonTextStyles: {
		textAlign: 'center',
		color: '#3D3D3D'
	}
};

export default AuthPage;
