import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button } from './common';

const ErrorModal = ({ children, visible, onClose }) => {
	const { container, innerContainer, modalButton, messageStyle } = styles;

	return (
		<Modal 
			visible={visible}
			animationType="slide"
			onRequestClose={() => {}}
		>
			<View style={container}>
				<View style={innerContainer}>
					<Text style={messageStyle}>{children}</Text>
					<TouchableWithoutFeedback
						onPress={onClose}
					>
						<View>
							<Text style={modalButton}>Okay</Text>
						</View>
					</TouchableWithoutFeedback>
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
		marginTop: 30,
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
		textAlign: 'center'
	}
};

export default ErrorModal;
