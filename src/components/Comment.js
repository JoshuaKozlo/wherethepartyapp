import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

class Comment extends Component {
	renderDelete() {
		const { admin, data } = this.props;
		if (admin) {
			return (
				<TouchableOpacity 
					style={styles.deleteStyle}
					onPress={() => this.props.commentDelete(data)}
				>
					<Text style={{ fontWeight: 'bold', color: '#AAA' }}>X</Text>
				</TouchableOpacity>
			);
		}
	}

	render() {
		const { sender, message } = this.props.data;
		const { nameStyle, statusStyle, containerStyle, textStyle } = styles;
		return (
			<View style={containerStyle}>
				<Image
					style={{ width: 45, height: 45, marginLeft: 10, marginTop: 10 }}
					source={require('../img/person.png')}
				/>
				<View style={textStyle}>
					<Text style={nameStyle}>{sender}</Text>
					<Text style={statusStyle}>{message}</Text>
				</View>
				{this.renderDelete()}
			</View>
		);
	}
}

const styles = {
	nameStyle: {
		fontSize: 13,
		fontWeight: '600',
		marginTop: 8,
		color: '#3d3d3d'
	},
	statusStyle: {
		fontSize: 12,
		color: '#3d3d3d',
		flexWrap: 'wrap'
	},
	textStyle: {
		paddingHorizontal: 15,
		flex: 1
	},
	containerStyle: {
		padding: 5,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#FFF',
		marginBottom: 10
	},
	deleteStyle: {
		position: 'absolute',
		top: 10,
		right: 10
	}
};

export default Comment;
