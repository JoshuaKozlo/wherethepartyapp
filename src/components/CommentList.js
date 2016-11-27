import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ListView } from 'react-native';
import _ from 'lodash';
import { commentsFetch } from '../actions';
import Comment from './Comment';

class CommentList extends Component {
	componentWillMount() {
		this.props.commentsFetch(this.props.place);
		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}

	createDataSource({ comments }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(comments);
	}

	renderComments() {
		const { noCommentStyle } = style;

		if (_.isEmpty(this.props.comments)) {
			return <Text style={noCommentStyle}>No Comments, Write the first!</Text>;
		}
		return (
			<ListView
				dataSource={this.dataSource}
				renderRow={this.renderRow.bind(this)}
				enableEmptySections
			/>
		);
	}

	renderRow(comment) {
		return (
			<Comment
				commentDelete={this.props.commentDelete}
				admin={this.props.admin} 
				data={comment} 
			/>
		);
	}

	render() {
		return this.renderComments();
	}
}

const style = {
	noCommentStyle: {
		color: '#A9A9A9',
		textAlign: 'center',
		paddingTop: 20,
		fontSize: 12,
		flex: 1
	}
};

const mapStateToProps = ({ commentList }) => {
	const comments = _.map(commentList, (val, id) => {
		return { ...val, id };
	});
	return { comments };
	// if (commentList) {
	// 	return { comments: commentList };
	// }
	// return { comments: {} };
};

export default connect(mapStateToProps, { commentsFetch })(CommentList);
