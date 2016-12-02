import React, { Component } from 'react';
import { Text, View, TouchableOpacity, InteractionManager } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { signOutUser } from '../actions';

class Navigation extends Component {
	onClick(placeId) {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigator.push({ name: 'PlaceManager', passProps: { placeId } });
		});
	}

	renderManagedPlaces() {
		const managedPlaces = _.map(this.props.user.admin, (val, placeId) => {
			return (
				<TouchableOpacity 
					key={placeId} 
					style={styles.itemStyle}
					onPress={() => this.onClick(placeId)}
				>
					<Text style={styles.textStyle}>{val}</Text>
				</TouchableOpacity>
			);
		});

		return managedPlaces;
	}

	render() {
		const { containerStyle, itemStyle, textStyle } = styles;

		return (
			<View style={containerStyle}>
				<TouchableOpacity 
					style={itemStyle} 
					onPress={() => this.props.navigator.push({ name: 'PlaceList' })}
				>
					<Text style={textStyle}>Bars & Clubs</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={itemStyle} 
					onPress={() => { 
						this.props.signOutUser();
						this.props.navigator.push({ name: 'AuthPage' });
					}}
				>
					<Text style={textStyle}>Sign Out</Text>
				</TouchableOpacity>
				{this.renderManagedPlaces()}
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		zIndex: 10000,
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
	}
};

const mapStateToProps = ({ user }) => {
	return { user };
};

export default connect(mapStateToProps, { signOutUser })(Navigation);
