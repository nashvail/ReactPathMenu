import React from 'react';
import ReactDOM from 'react-dom';

// Components 
import FlyMenu from './FlyMenu';

//Constants 

// Diameter of the main button in pixels
const MAIN_BUTTON_DIAM = 90;
// The number of child buttons that fly out from the main button
const NUM_CHILDREN = 4;

class APP extends React.Component {
	constructor(props) {
		super(props);	

		this.state = {
			isOpen: false
		};

		// Returns the x and y coordinates of the center of the main button
		this.mainButtonCenter = this.mainButtonCenter.bind(this);
	}

	componentDidMount() {
	}

	mainButtonCenter() {
		let mainButton = ReactDOM.findDOMNode(this.refs.mainButton);
		console.dir(mainButton);
		return( {x: mainButton.offsetLeft + (MAIN_BUTTON_DIAM/2), y:mainButton.offsetTop + (MAIN_BUTTON_DIAM/2)} );
	}

	render() {
		return (
			<div>
				<FlyMenu parent={this} ref="mainButton" diam={MAIN_BUTTON_DIAM} />
			</div>
		);
	}	
};

module.exports = APP;