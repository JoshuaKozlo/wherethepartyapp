import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { signUpUser } from '../actions';
import { Spinner } from './common';

class SignUpForm extends Component {
	state = {
		first: 'Jose',
		last: 'Test',
		email: 'test1@test.com',
		password: 'password',
		passwordConfirm: 'password',
		error: ''
	}

	onButtonPress() {
		this.props.signUpUser(this.state);
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="small" />;
		}
		return (
			<TouchableOpacity style={styles.buttonStyle} onPress={this.onButtonPress.bind(this)}>
				<Text>Sign Up</Text>
			</TouchableOpacity>
		);
	}

	render() {
		const { containerStyles, inputStyles, innerContainer } = styles;

		return (
			<View style={containerStyles}>
				<View style={innerContainer}>
					<TextInput
						autoCorrect={false}
						placeholder="First"
						onChangeText={first => this.setState({ first })}
						value={this.state.first}
						style={inputStyles}
						maxLength={35}
					/>
					<TextInput
						autoCorrect={false}
						placeholder="Last"
						onChangeText={last => this.setState({ last })}
						value={this.state.last}
						style={inputStyles}
						maxLength={35}
					/>
					<TextInput
						autoCorrect={false}
						placeholder="Email"
						onChangeText={email => this.setState({ email })}
						value={this.state.email}
						style={inputStyles}
						maxLength={254}
					/>
					<TextInput
						autoCorrect={false}
						placeholder="Password"
						onChangeText={password => this.setState({ password })}
						value={this.state.password}
						style={inputStyles}
						maxLength={128}
						secureTextEntry
					/>
					<TextInput
						autoCorrect={false}
						placeholder="Confirm Password"
						onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
						value={this.state.passwordConfirm}
						style={inputStyles}
						maxLength={128}
						secureTextEntry
					/>
					<Text style={{ color: 'red', padding: 10 }}>{this.props.error}</Text>
					{this.renderButton()}
				</View>
			</View>
		);
	}
}

const styles = {
	containerStyles: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		marginTop: 65
	},
	inputStyles: {
		height: 50,
		flex: 1,
		marginHorizontal: 30,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: '#DADADA',
		borderRadius: 3
	},
	buttonStyle: {
		width: 100,
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
		alignItems: 'center'
	},
	innerContainer: {
		alignItems: 'center',
		marginTop: 50
	}
};

const mapStateToProps = ({ auth }) => {
	const { error, loading } = auth;
	return { error, loading };
};

export default connect(mapStateToProps, { signUpUser })(SignUpForm);
