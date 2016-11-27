import React, { Component } from 'react';
import { Text, View, TouchableOpacity, InteractionManager } from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { signOutUser } from '../actions';

class Navigation extends Component {
	renderManagedPlaces() {
		if (this.props.managed){
			const managedPlaces = _.map(this.props.managed, (val, placeId) => {
				return (
					<TouchableOpacity 
						key={placeId} 
						style={styles.itemStyle}
						onPress={() => this.onClick(placeId)}
					>
						<Text style={styles.textStyle}>{val.name}</Text>
					</TouchableOpacity>
				);
			});

			return managedPlaces;
		}
	}

	onClick(placeId) {
		InteractionManager.runAfterInteractions(() => {
			Actions.placeManager({ placeId });
		});
	}

	render() {
		const { containerStyle, itemStyle, exitStyle, textStyle } = styles;

		return (
			<View style={containerStyle}>
			<Text style={exitStyle} onPress={() => Actions.pop()}>X</Text>
			<TouchableOpacity style={itemStyle} onPress={Actions.placeList}>
				<Text style={textStyle}>Bars & Clubs</Text>
			</TouchableOpacity>
			<TouchableOpacity style={itemStyle} onPress={this.props.signOutUser}>
				<Text style={textStyle}>Me</Text>
			</TouchableOpacity>
				{this.renderManagedPlaces()}
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	itemStyle: {
		padding: 20,
		borderColor: '#777',
		borderBottomWidth: 0.5
	},
	textStyle: {
		color: '#777'
	},
	exitStyle: {
		position: 'absolute',
		top: 35,
		right: 25,
		fontSize: 20,
		opacity: 0.8,
		padding: 10
	}
};

const mapStateToProps = ({ managed }) => {
	if (managed) {
		return { managed };
	}
};

export default connect(mapStateToProps, { signOutUser })(Navigation);
