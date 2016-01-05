import React from 'react';

class FlyMenu extends React.Component {
	constructor(props) {
		super(props);	

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		let {parent} =  this.props;
		let {isOpen} = parent.state;
		parent.setState({ isOpen: !isOpen});
	}

	render() {
		let {diam} = this.props;
		return (
			<div 
				className="main-button" 
				onClick={this.handleClick}
				style={{
					width: diam,
					height: diam
				}}/>
		);
	}	
};

module.exports = FlyMenu;