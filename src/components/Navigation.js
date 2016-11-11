import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Navigation extends Component {
	render() {
		const { containerStyle, itemStyle, exitStyle } = styles;

		return (
			<View style={containerStyle}>
			<Text style={exitStyle} onPress={() => Actions.pop()}>X</Text>
			<TouchableOpacity onPress={Actions.placeList}>
				<View style={itemStyle}>
					<Text>Bars & Clubs</Text>
				</View>
			</TouchableOpacity>
				<View style={itemStyle}>
					<Text>Me</Text>
				</View>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	itemStyle: {
		padding: 20,
		borderColor: '#000',
		borderBottomWidth: .5,
		opacity: .5
	},
	exitStyle: {
		position: 'absolute',
		top: 35,
		right: 25,
		fontSize: 20,
		opacity: .8,
		padding: 10
	}
};

export default Navigation;
