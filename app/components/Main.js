import React from 'react';

const { Component } = React;

class Main extends Component{
	render(){
		var divStyle = {
		  backgroundColor: 'yellow',
		  padding: 30
		};
		return (
				<div style={divStyle}>
					<p>Main Screen</p>
					<div className="content">
						{this.props.children}
					</div>
				</div>
		);
	}
}
 
module.exports = Main;