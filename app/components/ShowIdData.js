import React from "react";
import {connect} from "react-redux";


class ShowIdData extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			textVals :[]
		}
	this.textChange = this.textChange.bind(this)
	this.updateText = this.updateText.bind(this)
	}
	updateText(e){
		var newTextVals = this.state.textVals.filter((val)=>{
			if(val.text.trim()==''){
				//console.log("filter")
				return false
			}
			return true
		})
		newTextVals.map((val)=>{
			val.text = val.text.trim()
			return val
		})
		this.setState({
			textVals : newTextVals
		})
	}
	textChange(e){
		var modified = false
		const newTextVals = this.state.textVals.map((val)=>{
			if(val.id == this.props.IdData.id){
				modified = true;
				val.text = e.target.value
			}
			return val;
		})
		if(!modified){
			//console.log('insert');
			newTextVals.push({
				id : this.props.IdData.id,
				text : e.target.value 
			})
		}
		this.setState({
			textVals : newTextVals
		})
	}
	render(){
		var divStyle = {
		  backgroundColor: 'black',
		  color:'white',
		  padding: 30
		}
		var textStyle ={
			color:'black'
		}
		return(
				<div style={divStyle}>
				<p>Content related to {this.props.IdData.id}</p>
				<p>Author Name {this.props.IdData.authorName}</p>
				<p>thread Name : &nbsp;
					<a href="#" onClick={(e)=>{e.preventDefault();this.props.authorClick(this.props.IdData.threadName)}}>
						{this.props.IdData.threadName}
					</a>
				</p>
				{(()=>{
					const match = this.state.textVals.filter((textVal)=>{
						//console.log(textVal);
						return textVal.id == this.props.IdData.id;
					})
					//console.log(match.length);
					if(match.length==1){
						return (<p><input type="text" onBlur={this.updateText} onChange={this.textChange}
									style={textStyle} value={match[0].text}/></p>)
					}
					else{
						return(<p><input type="text" onBlur={this.updateText} onChange={this.textChange} 
							style={textStyle} placeholder="enter text" value="" /></p>)
					}
				})()}
				</div>
		);
	}
}

/*const mapStateToProps = (state)=>{
	return {
			IdData : state.threadData.data
		};
};


const ShowIdData = connect(
	mapStateToProps
)(ShowIdDataa);*/


module.exports = ShowIdData;
