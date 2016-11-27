import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { updateStatus, commentDelete } from '../actions';
import CommentList from './CommentList';
import CommentSubmit from './CommentSubmit';
import ConfirmCommentDelete from './ConfirmCommentDelete';

class PlaceManager extends Component {
	state = {
		statusText: '',
		showModal: false,
		toDelete: {}
	}

	componentWillMount() {
		this.setState({ statusText: this.props.place.status });
	}

	renderUpdateStatus() {
		if (this.state.statusText !== this.props.place.status) {
			return (
				<TouchableOpacity 
					style={style.postStatusStyle} 
					onPress={() => this.props.updateStatus(this.props.place.id, this.state.statusText)}
				>
					<Text>Update Status</Text>
				</TouchableOpacity>
			);
		}
	}

	onCommentDelete() {
		this.props.commentDelete(this.props.place.id, this.state.toDelete.id);
		this.setState({ showModal: false, toDelete: {} });
	}

	render() {
		const { count, name, id } = this.props.place;
		const {
			countStyle, countContainerStyle, nameStyle, 
			statusStyle, textStyle, containerStyle
		} = style;
		const countBackground = id === this.props.user.place ? 'rgba(140,194,75,.25)' : '#FFF';
		const countColor = id === this.props.user.place ? 'rgb(194, 209, 176)' : '#DDD';
		const countFontSize = count < 100 ? 50 : 40;

		return (
			<View style={{ flex: 1 }}>
				<View style={containerStyle}>
					<View style={[countContainerStyle, { backgroundColor: countBackground }]}>
						<Text 
							style={[countStyle, { fontSize: countFontSize, color: countColor }]}
						>{count}</Text>
					</View>
					<View style={textStyle}>
						<Text style={nameStyle}>{name}</Text>
						<TextInput
							style={statusStyle}
							value={this.state.statusText}
							onChangeText={(statusText) => this.setState({ statusText })}
							maxLength={120}
							multiline
						/>
						{this.renderUpdateStatus()}
					</View>
				</View>
				<CommentList admin commentDelete={comment => this.setState({ toDelete: comment, showModal: true })} place={id} />
				<CommentSubmit admin={this.props.place.name} placeId={id} />
				<ConfirmCommentDelete
					visible={this.state.showModal}
					onYes={this.onCommentDelete.bind(this)}
					onNo={() => this.setState({ showModal: false })}
				>
					{this.state.toDelete.message}
				</ConfirmCommentDelete>
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
		color: '#3d3d3d',
		paddingLeft: 10
	},
	statusStyle: {
		height: 75,
		marginRight: 10,
		backgroundColor: '#EEE',
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: '#DDD',
		paddingHorizontal: 10,
		flex: 1
	},
	textStyle: {
		marginLeft: 10,
		paddingBottom: 5,
		flex: 3
	},
	postStatusStyle: {
		alignSelf: 'flex-end',
		marginRight: 10,
		marginTop: 3,
		padding: 5,
		borderRadius: 5,
		borderWidth: 1
	},
	containerStyle: {
		padding: 5,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		borderColor: '#DDD',
		backgroundColor: '#FFF',
		borderBottomWidth: 1
		
	}
};

const mapStateTopProps = ({ places, user }, ownProps) => {
	const place = places[ownProps.placeId];
	return { place, user };
};

export default connect(mapStateTopProps, { updateStatus, commentDelete })(PlaceManager);
