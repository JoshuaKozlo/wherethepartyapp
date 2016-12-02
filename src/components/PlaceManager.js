import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { updateStatus, commentDelete, fetchAdminData, cancelPlaceHandles } from '../actions';
import CommentList from './CommentList';
import CommentSubmit from './CommentSubmit';
import ConfirmCommentDelete from './ConfirmCommentDelete';

class PlaceManager extends Component {
	state = {
		statusText: '',
		showModal: false,
		toDelete: {}
	}

	componentDidMount() {
		this.props.fetchAdminData(this.props.placeId);
		this.setState({ statusText: this.props.status });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.place.status !== this.props.place.status) {
			if (nextProps.place.status !== this.state.statusText) {
				this.setState({ statusText: nextProps.place.status });
			}
		}
	}

	componentWillUnmount() {
		this.props.cancelPlaceHandles();
	}

	onCommentDelete() {
		this.props.commentDelete(this.props.placeId, this.state.toDelete.id);
		this.setState({ showModal: false, toDelete: {} });
	}

	renderUpdateStatus() {
		if (this.state.statusText !== this.props.place.status) {
			return (
				<TouchableOpacity 
					style={style.postStatusStyle} 
					onPress={() => this.props.updateStatus(this.props.placeId, this.state.statusText)}
				>
					<Text>Update Status</Text>
				</TouchableOpacity>
			);
		}
	}

	render() {
		const { count, name } = this.props.place;
		const { placeId } = this.props;
		const {
			countStyle, countContainerStyle, nameStyle, 
			statusStyle, textStyle, containerStyle
		} = style;
		const countBackground = placeId === this.props.user.place ? 'rgba(140,194,75,.25)' : '#FFF';
		const countColor = placeId === this.props.user.place ? 'rgb(194, 209, 176)' : '#DDD';
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
				<CommentList
					admin 
					commentDelete={comment => this.setState({ toDelete: comment, showModal: true })} 
					place={placeId} 
				/>
				<CommentSubmit admin={this.props.place.name} placeId={placeId} />
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

const mapStateTopProps = ({ managed, user }) => {
	const place = managed;
	return { place, user };
};

export default connect(mapStateTopProps, { updateStatus, commentDelete, fetchAdminData, cancelPlaceHandles })(PlaceManager);
