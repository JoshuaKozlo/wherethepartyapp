import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import { placesFetch, cancelPlaceHandles, userCheckIn, acceptError } from '../actions';
import PlaceItem from './PlaceItem';
import ErrorModal from './ErrorModal';

class PlaceList extends Component {
	state = {
		showModal: false
	}

	componentWillMount() {
		this.createDataSource(this.props);
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(({ coords }) => {
			const { latitude, longitude } = coords;
			this.props.placesFetch(latitude, longitude);
		}, error => console.log(error), { enableHighAccuracy: false });
	}

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);

		if (nextProps.user.error) {
			this.setState({ showModal: true });
		}
	}

	componentWillUnmount() {
		this.props.cancelPlaceHandles();
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
				navigator={this.props.navigator} 
				onCheckIn={this.props.userCheckIn}
				user={this.props.user}
				data={place}
			/>
		);
	}

	render() {
		return (
			<View style={{ flex: 1, marginTop: 65 }}>
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
	placesFetch, userCheckIn, acceptError, cancelPlaceHandles })(PlaceList);
