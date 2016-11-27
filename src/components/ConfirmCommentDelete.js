import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Button } from './common';

const ConfirmCommentDelete = ({ children, onYes, onNo, visible }) => {
	const { container, innerContainer, modalButton, messageStyle, commentStyle } = styles;

	return (
		<Modal
			visible={visible} 
			animationType="slide"
			onRequestClose={() => {}}
		>
			<View style={container}>
				<View style={innerContainer}>
					<Text style={messageStyle}>Are you sure you want to delete the comment...</Text>
					<Text style={commentStyle}>"{children}"?</Text>
					<View style={{ flexDirection: 'row' }}>
						<TouchableOpacity
							onPress={onYes}
						>
							<View>
								<Text style={modalButton}>Yes</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={onNo}
						>
							<View>
								<Text style={modalButton}>No</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>

		</Modal>
	);
};

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: 'rgb(197,75,81)'
	},

	innerContainer: {
		alignItems: 'center'
	},
	modalButton: {
		margin: 20,
		fontSize: 15,
		color: '#FFF',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
		borderWidth: 1,
		borderColor: '#FFF',
		borderRadius: 5
	},
	messageStyle: {
		fontSize: 18,
		color: '#FFF',
		textAlign: 'center',
		margin: 10
	},
	commentStyle: {
		margin: 10,
		fontSize: 16,
		color: '#FFF',
		textAlign: 'center'
	}
};

export default ConfirmCommentDelete;
