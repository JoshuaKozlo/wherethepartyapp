import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CommentList from './CommentList';

class PlaceDetail extends Component {
	render() {
		const { count, name, status, id } = this.props.place;
		const { countStyle, countContainerStyle, nameStyle, statusStyle, textStyle, containerStyle } = style;

		return (
			<View>
				<View style={containerStyle}>
					<View style={countContainerStyle}>
						<Text style={countStyle}>{count}</Text>
					</View>
					<View style={textStyle}>
						<Text style={nameStyle}>{name}</Text>
						<Text style={statusStyle}>{status}</Text>
					</View>
				</View>
				<CommentList place={id} />
			</View>
		);
	}
}

const style = {
	countStyle: {
		fontSize: 50,
		color: '#ddd',
		padding: 0,
		margin: 0
	},
	countContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 0,
		margin: 0
	},
	nameStyle: {
		fontSize: 18,
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
		flex: 3
	},
	containerStyle: {
		padding: 5,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderColor: '#DDD',
		backgroundColor: '#FFF',
		borderBottomWidth: 1
		
	}
};

export default PlaceDetail;
