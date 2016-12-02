import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CommentList from './CommentList';
import CommentSubmit from './CommentSubmit';

class PlaceDetail extends Component {
	componentWillUnmount() {
		console.log('place detail unmount')
	}

	render() {
		const { count, name, status, id } = this.props.place;
		const { countStyle, countContainerStyle, nameStyle, statusStyle, textStyle, containerStyle } = style;
		const countBackground = id === this.props.user.place ? 'rgba(140,194,75,.25)' : '#FFF';
		const countColor = id === this.props.user.place ? 'rgb(194, 209, 176)' : '#DDD';
		const countFontSize = count < 100 ? 50 : 40;

		return (
			<View style={{ flex: 1, marginTop: 65 }}>
				<View style={containerStyle}>
					<View style={[countContainerStyle, { backgroundColor: countBackground }]}>
						<Text 
							style={[countStyle, { fontSize: countFontSize, color: countColor }]}
						>{count}</Text>
					</View>
					<View style={textStyle}>
						<Text style={nameStyle}>{name}</Text>
						<Text style={statusStyle}>{status}</Text>
					</View>
				</View>
				<CommentList place={id} />
				<CommentSubmit placeId={id} sender={this.props.user} />
			</View>
		);
	}
}

const style = {
	countStyle: {
		fontSize: 50,
		padding: 0,
		margin: 0
	},
	countContainerStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 80,
		height: 80,
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

const mapStateTopProps = ({ places, user }, ownProps) => {
	const place = places[ownProps.placeId];
	return { user, place };
};

export default connect(mapStateTopProps)(PlaceDetail);
