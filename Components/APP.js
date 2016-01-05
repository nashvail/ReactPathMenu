'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';

// Components 

//Constants 

// Diameter of the main button in pixels
const MAIN_BUTTON_DIAM = 90;
const CHILD_BUTTON_DIAM = 40;
// The number of child buttons that fly out from the main button
const NUM_CHILDREN = 5;
// Hard code the position values of the mainButton
const M_X = 490;
const M_Y = 450;

const SPRING_CONFIG = [500, 20];

// For the intricacies 

// How far away from the main button does the child buttons go
const FLY_OUT_RADIUS = 120,
	SEPARATION_ANGLE = 35, //degrees
	FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE,
	BASE_ANGLE = (180 - FAN_ANGLE)/2; // degrees

function toRadians(degrees) {
	return degrees * 0.0174533;
}

function childDeltaX(index) {
	let angle = BASE_ANGLE + (index* SEPARATION_ANGLE);
	return ( M_X + FLY_OUT_RADIUS * Math.cos(toRadians(angle)) - (CHILD_BUTTON_DIAM/2));
}

function childDeltaY(index) {
	let angle = BASE_ANGLE + (index* SEPARATION_ANGLE);
	return ( M_Y - FLY_OUT_RADIUS * Math.sin(toRadians(angle)) - (CHILD_BUTTON_DIAM/2));
}


class APP extends React.Component {
	constructor(props) {
		super(props);	

		this.state = {
			isOpen: false
		};

		// Bind this to the functions 
		this.openMenu = this.openMenu.bind(this);
	}

	mainButtonStyles() {
		return {
			width: MAIN_BUTTON_DIAM,
			height: MAIN_BUTTON_DIAM,
			top: M_Y - (MAIN_BUTTON_DIAM/2),
			left: M_X - (MAIN_BUTTON_DIAM/2)
		};
	}

	initialChildButtonStyles() {
		return {
			width: CHILD_BUTTON_DIAM,
			height: CHILD_BUTTON_DIAM,
			top: M_Y - (CHILD_BUTTON_DIAM/2),
			left: M_X - (CHILD_BUTTON_DIAM/2)
		};
	}

	finalChildButtonStyles(childIndex) {
		// we've gotta figure out al lthe math here right ? 
		let deltaX = childDeltaX(childIndex),
			deltaY = childDeltaY(childIndex);

		return {
			width: CHILD_BUTTON_DIAM,
			height: CHILD_BUTTON_DIAM,
			top: deltaY,
			left: deltaX
		};
	}

	openMenu() {
		let{isOpen} = this.state;
		this.setState({
			isOpen: !isOpen
		});
	}

	render() {
		let {isOpen} = this.state;
		return (
			<div>
				{range(NUM_CHILDREN).map( index => {
					let style = isOpen 
					? {
						width: CHILD_BUTTON_DIAM,
						height: CHILD_BUTTON_DIAM,
						top: spring(childDeltaY(index), SPRING_CONFIG),
						left: spring(childDeltaX(index), SPRING_CONFIG)
					}
					: {
						width: CHILD_BUTTON_DIAM,
						height: CHILD_BUTTON_DIAM,
						top: spring(M_Y - (CHILD_BUTTON_DIAM/2), SPRING_CONFIG),
						left: spring(M_X - (CHILD_BUTTON_DIAM/2), SPRING_CONFIG)
					};
					return (
						<Motion style={style} key={index}>
							{({width, height, top, left}) => 
								<div	
									className="child-button"
									style={{
										width: width,
										height: height,
										top: top,
										left: left
									}}/>
							}
						</Motion>
					);
				})}
				<div 
					className="main-button"
					style={this.mainButtonStyles()}
					onClick={this.openMenu}/>
			</div>
		);
	}	
};

module.exports = APP;