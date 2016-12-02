import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class AuthPage extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.user) {
			this.props.navigator.push({ name: 'Navigation' });
		}
	}

	render() {
		const { containerStyles, innerContainerStyles,
			buttonStyles, buttonTextStyles
		} = styles;

		const { navigator } = this.props;

		return (
			<View style={containerStyles}>
				<View style={innerContainerStyles}>
					<TouchableOpacity style={buttonStyles} onPress={() => navigator.push({ name: 'SignIn' })}>
						<Text style={buttonTextStyles}>Sign In</Text>
					</TouchableOpacity>
					<TouchableOpacity style={buttonStyles} onPress={() => navigator.push({ name: 'SignUp' })}>
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

const mapStateToProp = ({ auth }) => {
	const { user } = auth;
	return { user };
};

export default connect(mapStateToProp)(AuthPage);
