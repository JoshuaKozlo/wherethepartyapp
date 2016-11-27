import React, { Component } from 'react';
import { 
	Animated,
	InteractionManager,
	PanResponder, 
	Text,
	LayoutAnimation,
	View 
 } from 'react-native';
 import { Actions } from 'react-native-router-flux';

class PlaceItem extends Component {
	state = {
		pan: new Animated.Value(0),
		color: new Animated.Value(0)
	}

	componentWillMount() {
		const { onCheckIn, data, user } = this.props;

		if (user.place === data.id) {
			this.state.pan.setValue(600);
		}

		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderTerminationRequest: () => false,
			
			onPanResponderMove: (evt, gestureState) => {
				if (data.id !== this.props.user.place) {
					this.state.pan.setValue(gestureState.dx);
				} else if (gestureState.dx > 0) {
					this.state.color.setValue(gestureState.dx);
				}
			},

			onPanResponderRelease: (e, gestureState) => {
				if (gestureState.dx === 0) {
					this.onClick();
				} else if (data.id !== this.props.user.place) {			
					if (gestureState.dx > 200) {
						this.state.pan.setValue(600);
						onCheckIn(data.id);
					} else {
						this.state.pan.setValue(0);
					}
				} else if (data.id === this.props.user.place) {
					if (gestureState.dx > 200) {
						onCheckIn();
						Animated.timing(this.state.color, 
							{ toValue: 0, duration: 1000 }).start();
					} else {
						this.state.color.setValue(0);
					}
				} 
			}

		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.place !== this.props.data.id) {
			this.state.pan.setValue(0);
		}
	}

	componentWillUpdate() {
		LayoutAnimation.linear();
	}

	onClick() {
		InteractionManager.runAfterInteractions(() => {
			Actions.placeDetail({ placeId: this.props.data.id });
		});
	}

	renderCount(count, style) {
		const fontSize = count < 100 ? 50 : 40;
		if (count > 9) {
			return <Text style={[style, { fontSize }]}>{count}</Text>;
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
				<Animated.View style={[sliderStyle, { width: this.state.pan, backgroundColor: color }]} />
			</View>
		);
	}
}

const style = {
	countStyle: {
		marginRight: 10,
		marginLeft: 10,
		color: '#ddd'
	},
	nameStyle: {
		fontSize: 18,
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
		position: 'absolute',
		top: 0,
		left: 0
	},
	containerStyle: {
		padding: 5,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		height: 75,
		borderColor: '#DDD',
		backgroundColor: '#FFF',
		borderBottomWidth: 1
		
	}
};

export default PlaceItem;
