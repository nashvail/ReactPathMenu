'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';

// Components 

//Constants 

// Diameter of the main button in pixels
const MAIN_BUTTON_DIAM = 90;
const CHILD_BUTTON_DIAM = 50;
// The number of child buttons that fly out from the main button
const NUM_CHILDREN = 4;
// Hard code the position values of the mainButton
const M_X = 490;
const M_Y = 450;

const SPRING_CONFIG = [500, 20];

// For the intricacies 

// How far away from the main button does the child buttons go
const FLY_OUT_RADIUS = 120,
	SEPARATION_ANGLE = 40, //degrees
	FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE, //degrees
	BASE_ANGLE = ((180 - FAN_ANGLE)/2); // degrees

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
			isOpen: false,
			childButtons: []
		};

		// Bind this to the functions 
		this.openMenu = this.openMenu.bind(this);
	}

	componentDidMount() {
		let childButtons = [];
		range(NUM_CHILDREN).forEach(index => {
			childButtons.push(this.renderChildButton(index));
		});

		this.setState({childButtons: childButtons.slice(0)});
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
			top: spring(M_Y - (CHILD_BUTTON_DIAM/2), SPRING_CONFIG),
			left: spring(M_X - (CHILD_BUTTON_DIAM/2), SPRING_CONFIG)
		};
	}

	finalChildButtonStyles(childIndex) {
		return {
			width: CHILD_BUTTON_DIAM,
			height: CHILD_BUTTON_DIAM,
			top: spring(childDeltaY(childIndex), SPRING_CONFIG),
			left: spring(childDeltaX(childIndex), SPRING_CONFIG)
		};
	}

	openMenu() {
		let{isOpen} = this.state;
		this.setState({
			isOpen: !isOpen
		});

		range(NUM_CHILDREN).forEach((index) => {
			let {childButtons} = this.state;
			setTimeout(() => {
				childButtons[NUM_CHILDREN - index - 1]	= this.renderChildButton(NUM_CHILDREN - index - 1);
				this.setState({childButtons: childButtons.slice(0)});
			}, index * 50);
		});
	}

	renderChildButton(index) {
		let {isOpen} = this.state;
		let style = isOpen ? this.finalChildButtonStyles(index) : this.initialChildButtonStyles() ;
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
	}

	render() {
		let {isOpen, childButtons} = this.state;
		return (
			<div>
				{childButtons.map( (button, index) => {
					return childButtons[index];
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