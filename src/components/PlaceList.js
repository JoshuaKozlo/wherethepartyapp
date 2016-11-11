import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { placesFetch, userCheckIn, acceptError, selectPlace, fetchUserData } from '../actions';
import PlaceItem from './PlaceItem';
import ErrorModal from './ErrorModal';

class PlaceList extends Component {
	state = {
		showModal: false
	}

	componentWillMount() {
		navigator.geolocation.getCurrentPosition(({ coords }) => {
			const { latitude, longitude } = coords;
			this.props.placesFetch(latitude, longitude);
		});
		this.createDataSource(this.props);
		this.props.fetchUserData();
	}

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);

		if (nextProps.user.error) {
			this.setState({ showModal: true });

		}
	}

	createDataSource({ places }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(places);
	}

	closeModal() {
		this.setState({ showModal: false });
		this.props.acceptError();
	}

	renderRow(place) {
		return (
			<PlaceItem 
				onCheckIn={this.props.userCheckIn}
				user={this.props.user}
				selectPlace={this.props.selectPlace}
				data={place}
			/>
		);
	}

	render() {
		return (
			<View>
				<ListView
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow.bind(this)}
					scrollEnabled
				/>
				<ErrorModal
					visible={this.state.showModal}
					onClose={this.closeModal.bind(this)}
				>
					{this.props.user.error}
				</ErrorModal>
			</View>
		);
	}
}

const mapStateToProps = ({ places, user }) => {
	return { places, user };
};

export default connect(mapStateToProps, {
	placesFetch, userCheckIn, acceptError, selectPlace, fetchUserData })(PlaceList);
