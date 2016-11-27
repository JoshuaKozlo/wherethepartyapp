import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Animated, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { commentSubmit } from '../actions';

class CommentSubmit extends Component {
	state = {
		keyboardOffset: new Animated.Value(10),
		text: '',
		height: 25
	}

	componentWillMount() {
		Keyboard.addListener('keyboardDidShow', (e) => this.keyboardWillShow(e));
		Keyboard.addListener('keyboardDidHide', (e) => this.keyboardWillHide(e));
	}

	componentWillUnmount() {
		Keyboard.removeListener('keyboardDidShow', (message) => console.log(message));
		Keyboard.removeListener('keyboardDidHide', (message) => console.log(message));
	}

	onCommentChange(event) {
		const { contentSize, text } = event.nativeEvent;

		this.setState({ 
			text,
			height: contentSize.height + 3
		});
	}

	onSubmit() {
		const { placeId, admin } = this.props;
		const message = this.state.text.replace(/\r?\n|\r/g, ' ');
		if (this.state.text.length > 2) {
			this.props.commentSubmit(placeId, message, admin);
			this.setState({ text: '', height: 25 });
		}
	}

	keyboardWillShow(e) {
		Animated.spring(this.state.keyboardOffset, {
			toValue: e.endCoordinates.height + 10,
			friction: 10
		}).start();
	}

	keyboardWillHide(e) {
		Animated.spring(this.state.keyboardOffset, {
			toValue: 10,
			friction: 10
		}).start();
	}

	render() {
		const { inputStyles, containerStyles, submitStyles } = styles;
		return (
			<Animated.View style={[containerStyles, { paddingBottom: this.state.keyboardOffset }]}>
				<TextInput 
					style={[inputStyles, { height: this.state.height }]}
					maxLength={120}
					placeholder={' Write a Comment...'}
					multiline
					onChange={this.onCommentChange.bind(this)}
					value={this.state.text}
				/>
					<TouchableOpacity 
						onPress={this.onSubmit.bind(this)}
					>
						<View style={submitStyles}>
							<Text>Post</Text>
						</View>
					</TouchableOpacity>
			</Animated.View>
		);
	}
}

const styles = {
	containerStyles: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: '#FFF',
		position: 'relative',
		bottom: 0
	},
	inputStyles: {
		paddingHorizontal: 10,
		fontSize: 15,
		flex: 2,
		borderWidth: 1,
		borderRadius: 15,
		borderColor: '#D1D1D1',
		backgroundColor: '#FFF'
	},
	submitStyles: {
		flex: 1,
		padding: 3,
		marginLeft: 10,
		borderRadius: 5
	}
};

export default connect(null, { commentSubmit })(CommentSubmit);
