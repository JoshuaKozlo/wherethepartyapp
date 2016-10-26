import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ListView, View } from 'react-native';
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

		if (!this.props.comments) {
			return <Text style={noCommentStyle}>No Comments, Write the first!</Text>
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
		return <Comment data={comment} />;
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
		fontSize: 12
	}
};

const mapStateToProps = (state, ownProps) => {
	if (state.comments) {
		return { comments: state.comments };
	}
	return { comments: false };
	// if (state.comments[ownProps.place]) {
	// 	return { comments: state.comments[ownProps.place] };
	// } 
	// return { comments: false };
};

export default connect(mapStateToProps, { commentsFetch })(CommentList);