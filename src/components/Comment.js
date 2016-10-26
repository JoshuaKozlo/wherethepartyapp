import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Comment extends Component {
	render() {
		const { name, message } = this.props.data;
		const { nameStyle, statusStyle, containerStyle, textStyle } = style;

		return (
			<View style={containerStyle}>
				<View style={textStyle}>
					<Text style={nameStyle}>{name}</Text>
					<Text style={statusStyle}>{message}</Text>
				</View>
			</View>
		);
	}
}

const style = {
	nameStyle: {
		fontSize: 13,
		fontWeight: '600',
		marginTop: 8,
		color: '#3d3d3d'
	},
	statusStyle: {
		fontSize: 12,
		color: '#3d3d3d',
		width: 250,
		flexWrap: 'wrap'
	},
	textStyle: {
		marginLeft: 10,
		paddingBottom: 10,
	},
	containerStyle: {
		padding: 5,
		justifyContent: 'flex-start',
		flexDirection: 'column',
		borderColor: '#DDD',
		backgroundColor: '#FFF',
		borderBottomWidth: 1
		
	}
};

export default Comment;
