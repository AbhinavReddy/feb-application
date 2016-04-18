
import React from 'react';
import actions from "../actions/actions";
import {Link } from 'react-router';
import ShowIdData from '../components/ShowIdData';

import {connect} from "react-redux";

class ShowIdss extends React.Component{
	/*constructor(props, context) {
      super(props, context);
    }
	componentDidUpdate(prevProps,prevState){
		console.log("in componentDidUpdate");
		if(this.props.currentId != NaN){
			console.log("in componentDidUpdate iff");
			this.context.router.transitionTo('showIdData', {objectId: 'asdf'});
		}
	}*/
	render(){
		//console.log("props");
		//const props = this.props;
		//console.log(props);
		//const { store } = props;
    	//const { store } = this.context;
    	//const state = store.getState();
		var divStyle = {
		  backgroundColor: 'red',
		  padding: 30
		};
		var buttonStyle = {
		  backgroundColor: 'yellow'
		};

		return(
				<div style={divStyle}>
				<p>Home Screen </p>
				{this.props.displayIds.map(id =>
					{	
						if(id == this.props.currentId){
							return (<button style={buttonStyle} key={id} 
								onClick={()=>this.props.idClick(id)}>
								id={id}</button>)
						}
						return (<button key={id} 
								onClick={()=>this.props.idClick(id)}>
								id={id}</button>)
					}
				)}

				{(()=>{
						if(this.props.currentId != null){
							return <ShowIdData authorClick ={this.props.authorClick} IdData = {this.props.IdData}/>
						}
					})()}

				</div>
		);
	}
}
/*ShowIdss.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  }
};*/


const mapStateToProps = (state)=>{
	return {
			displayIds : state.threadIds.ids,
			currentId  : state.threadIds.currentId,
			IdData : state.threadData.data
		};
};


const mapDispatchToProps = (dispatch)=>{
	return {
			idClick : (id) =>{
				dispatch(actions.idClickAction(id));
			},
			authorClick : (author) =>{
				actions.authorAction(dispatch,author);
			}
	};
};

const ShowIds = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShowIdss);

module.exports = ShowIds;
