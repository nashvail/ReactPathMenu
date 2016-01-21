
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';

// Components 

//Constants 

// Diameter of the main button in pixels
const MAIN_BUTTON_DIAM = 90;
const CHILD_BUTTON_DIAM = 48;
// The number of child buttons that fly out from the main button
const NUM_CHILDREN = 5;
// Hard code the position values of the mainButton
const M_X = 490;
const M_Y = 450;

const SPRING_CONFIG = [400, 28];

// How far away from the main button does the child buttons go
const FLY_OUT_RADIUS = 130,
	SEPARATION_ANGLE = 40, //degrees
	FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE, //degrees
	BASE_ANGLE = ((180 - FAN_ANGLE)/2); // degrees

// Names of icons for each button retreived from fontAwesome, we'll add a little extra just in case 
// the NUM_CHILDREN is changed to a bigger value
let childButtonIcons = ['pencil', 'at', 'camera', 'bell', 'comment', 'bolt', 'ban', 'code'];


// Utility functions

function toRadians(degrees) {
	return degrees * 0.0174533;
}

function finalChildDeltaPositions(index) {
	let angle = BASE_ANGLE + (index* SEPARATION_ANGLE);
	return {
		deltaX: FLY_OUT_RADIUS * Math.cos(toRadians(angle)) - (CHILD_BUTTON_DIAM/2),
		deltaY: FLY_OUT_RADIUS * Math.sin(toRadians(angle)) + (CHILD_BUTTON_DIAM/2)
	};
}


class APP extends React.Component {
	constructor(props) {
		super(props);	

		this.state = {
			isOpen: false,
			childButtons: []
		};

		// Bind this to the functions 
		this.toggleMenu = this.toggleMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.animateChildButtonsWithDelay = this.animateChildButtonsWithDelay.bind(this);
	}

	componentDidMount() {
		window.addEventListener('click', this.closeMenu);
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
			left: spring(M_X - (CHILD_BUTTON_DIAM/2), SPRING_CONFIG),
			rotate: spring(-180, SPRING_CONFIG),
			scale: spring(0.5, SPRING_CONFIG)
		};
	}

	finalChildButtonStyles(childIndex) {
		let {deltaX, deltaY} = finalChildDeltaPositions(childIndex);
		return {
			width: CHILD_BUTTON_DIAM,
			height: CHILD_BUTTON_DIAM,
			top: spring(M_Y - deltaY, SPRING_CONFIG),
			left: spring(M_X + deltaX, SPRING_CONFIG),
			rotate: spring(0, SPRING_CONFIG),
			scale: spring(1, SPRING_CONFIG)
		};
	}

	toggleMenu(e) {
		e.stopPropagation();
		let{isOpen} = this.state;
		this.setState({
			isOpen: !isOpen
		});

		this.animateChildButtonsWithDelay();
	}

	closeMenu() {
		this.setState({ isOpen: false});
		this.animateChildButtonsWithDelay();
	}

	animateChildButtonsWithDelay() {
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
				{({width, height, top, left, rotate, scale}) => 
					<div	
						className="child-button"
						style={{
							width: width,
							height: height,
							top: top,
							left: left,
							transform: `rotate(${rotate}deg) scale(${scale})`
						}}>
						<i className={"fa fa-" + childButtonIcons[index] + " fa-lg"}></i>
					</div>
				}
			</Motion>
		);
	}

	render() {
		let {isOpen, childButtons} = this.state;
		let mainButtonRotation = isOpen ? {rotate: spring(0, [500, 30])} : {rotate: spring(-135, [500, 30])};
		return (
			<div>
				{childButtons.map( (button, index) => {
					return childButtons[index];
				})}
				<Motion style={mainButtonRotation}>
					{({rotate}) => 
						<div 
							className="main-button"
							style={{...this.mainButtonStyles(), transform: `rotate(${rotate}deg)`}}
							onClick={this.toggleMenu}>
						{/*Using fa-close instead of fa-plus because fa-plus doesn't center properly*/}
							<i className="fa fa-close fa-3x"/>
						</div>
					}
				</Motion>
			</div>
		);
	}	
};

module.exports = APP;