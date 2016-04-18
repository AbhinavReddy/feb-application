import React from "react";
import {connect} from "react-redux";
//var LinkedStateMixin = require('react-addons-linked-state-mixin');



class loginForm extends React.Component{
	constructor(){
		super();
		//mixins: [LinkedStateMixin];
		this.state = {username:'a',password:'b'};
		this.validateUser = this.validateUser.bind(this);
	}
	validateUser(e){
		this.setState({
			username : this.state.username+'-->',
			password : this.state.password+'-->'
		});
	}
	render(){
		return(
				<div>
					<span>Log in</span>
					<label>{this.props.loggeIn?'you are logged in':'please log in'}</label>
					<input type='text' value='' placeholder="email" />
					<input type='text' value='' placeholder="password" />
					<button onClick={this.validateUser}>submit</button>
				</div>
		);
		//valueLink={this.linkState('username')} 
	}
}

const mapStateToProps = (state)=>{
	return {
			//IdData : state.threadData.data
		};
};


const login = connect(
	mapStateToProps
)(loginForm);


module.exports = login;
