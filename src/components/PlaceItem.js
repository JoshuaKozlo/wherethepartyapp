import React, { Component } from 'react';
import { 
	Animated,
	PanResponder, 
	Text,
	LayoutAnimation,
	View 
 } from 'react-native';
 import { Actions } from 'react-native-router-flux';

class PlaceItem extends Component {
	state = {
		pan: new Animated.Value(400),
		color: new Animated.Value(0)
	}

	componentWillMount() {
		const { onCheckIn, data } = this.props;

		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderTerminationRequest: () => false,
			
			onPanResponderMove: (evt, gestureState) => {
				if (data.id !== this.props.userPlace.place) {
					this.state.pan.setValue(400 - gestureState.dx);
				} else if (gestureState.dx > 0) {
					this.state.color.setValue(gestureState.dx);
				}
			},

			onPanResponderRelease: (e, gestureState) => {
				if (gestureState.dx === 0) {
					Actions.placeDetail({ place: this.props.data });
				} else if (data.id !== this.props.userPlace.place) {			
					if (gestureState.dx > 200) {
						this.state.pan.setValue(0);
						onCheckIn(data.id, this.props.userPlace.place);
					} else {
						this.state.pan.setValue(400);
					}
				} else if (data.id === this.props.userPlace.place) {
					if (gestureState.dx > 200) {
						onCheckIn('null', data.id, true);
					} else {
						this.state.color.setValue(0);
					}
				} 
			}

		});
	}

	componentWillReceiveProps(nextProps) {
		const { data, userPlace } = this.props;

		if (nextProps.userPlace.place !== userPlace.place) {
			this.state.color.setValue(0);
			if (nextProps.userPlace.place === data.id) {
				this.state.pan.setValue(0);
			} else {
				this.state.pan.setValue(400);
			}
		} else if (nextProps.userPlace.place !== data.id && nextProps.userPlace.error) {
			this.state.pan.setValue(400);
		}
	}

	componentWillUpdate() {
		LayoutAnimation.spring();
	}

	renderCount(count, style) {
		if (count > 9) {
			return <Text style={style}>{count}</Text>;
		} 
	}

	render() {
		const { count, name, status } = this.props.data;
		const { countStyle, nameStyle, statusStyle, textStyle, sliderStyle, containerStyle } = style;
		const color = this.state.color.interpolate({
			inputRange: [0, 100, 200],
			outputRange: ['rgba(140,194,75,.25)', 'rgba(0,0,0,.1)', 'rgba(255,0,0,.25)']
		});

		return (
		
			<View style={containerStyle} {...this.panResponder.panHandlers}>
				{this.renderCount(count, countStyle)}
				<View style={textStyle}>
					<Text style={nameStyle}>{name}</Text>
					<Text style={statusStyle} numberOfLines={1}>{status}</Text>
				</View>
				<Animated.View style={[sliderStyle, { right: this.state.pan, backgroundColor: color }]} />
			</View>
		);
	}
}

const style = {
	countStyle: {
		fontSize: 50,
		marginRight: 10,
		marginLeft: 10,
		color: '#ddd'
	},
	nameStyle: {
		fontSize: 18,
		marginTop: 8,
		color: '#3d3d3d'
	},
	statusStyle: {
		fontSize: 12,
		color: '#3d3d3d',
		width: 250,
		flexWrap: 'wrap'
	},
	textStyle: {
		marginLeft: 10
	},
	sliderStyle: {
		height: 75,
		width: 400,
		position: 'absolute',
		top: 0
	},
	containerStyle: {
		padding: 5,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		height: 75,
		borderColor: '#DDD',
		backgroundColor: '#FFF',
		borderBottomWidth: 1
		
	}
};

export default PlaceItem;
