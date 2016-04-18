import React from 'react'
import ReactDOM from 'react-dom'

import {connect} from "react-redux";

import actions from "../actions/actions";


class pageNtt extends React.Component{
		constructor(props){
			super(props)
			this.state = {
				searchText : "",
				noOfRec : 5,
				pageNo : 1,
				sortColumn : null,
				sortOrder : 1
			}
			this.columnClick = this.columnClick.bind(this)
			this.searchTextChange = this.searchTextChange.bind(this)
			this.noOfRecChange = this.noOfRecChange.bind(this)
			this.getManipulatedData = this.getManipulatedData.bind(this)
			this.sort = this.sort.bind(this)
			this.noOfRecChange= this.noOfRecChange.bind(this)
		}
		columnClick(colName){
			var sortOrder1 = (this.state.sortColumn == colName && this.state.sortOrder == 1 ) ? -1 : 1
			//console.log('sort' + colName + "  "+sortOrder1)
			this.setState({
				sortColumn : colName,
				sortOrder : sortOrder1
			})
		}
		searchTextChange(e){

		}
		noOfRecChange(){
			this.setState({
				noOfRec : ReactDOM.findDOMNode(this.refs.mynoOfRecs).value
			})
		}
		changePage(direction){
			if((this.state.pageNo + direction) >0 && (this.state.pageNo + direction) <= Math.ceil(7/this.state.noOfRec)){
				this.setState({
				pageNo : this.state.pageNo+direction
				})
			}
		}
		componentWillMount(){
			console.log('will mount');
			//only access to state and props
		}
		componentDidMount(){
			console.log('did mount');
			//has access to state , props and Dom // findDOMNode
		}
		componentWillUnmount(){
			console.log('will un mount');
			// clear any setInterval functions
		}
		componentWillReceiveProps(nextProps){
			//is not called for the first time component is receiving props
			console.log('will receive Props');
			//console.log(this.props.params.asd +"    " +nextProps.params.asd)
		}
		shouldComponentUpdate(nextProps, nextState){
			console.log('shouldComponentUpdate');
			return true;
		}
		componentDidUpdate(prevProps,prevState){
			console.log("componentDidUpdate")
		}
		render(){
			const data = this.getManipulatedData()//this.props.data)
			
			const columns=['id','threadID','threadName','authorName','text','timestamp'];
			const borderStyle ={
						border: 'solid black'
				}
			return (
					<div>
						<div>Is Fetching : {this.props.isFetching?'true':'false'}</div>
						<div>Did Receive : {this.props.didReceived?'true':'false'}</div>
						{(()=>{
								if(this.props.didReceived){
									//console.log(this.props.apiData)
									return <div>{JSON.stringify(this.props.apiData.query.created,null,4)}</div>
								}
								else{
									return <div>Receiving...</div>
								}
						})()}
						<button onClick={()=>this.props.getData(1)}>api</button>
						<input type='text' 
								onChange={this.searchTextChange} 
								defaultValue={this.state.searchText} placeholder="Search"/>
						<input type='text' ref='mynoOfRecs' name='inputValue' 
								defaultValue={this.state.noOfRec} placeholder="number Of Rec per page"/>
						<button onClick={()=>{this.noOfRecChange()}}>set</button>
						<button onClick={()=>{this.changePage(-1)}}>Prev</button>
						<button onClick={()=>{this.changePage(1)}}>Next</button>
						<table style={borderStyle}>
							<thead>
							<tr>
							{
								columns.map((colName)=>{
									if(this.state.sortColumn!=null && this.state.sortColumn==colName){
										return (
											<th style={borderStyle}>
												<a href="#" onClick={(e)=>{e.preventDefault();this.columnClick(colName)}}>{colName}</a> -> {this.state.sortOrder==1?'Asc' : 'Desc'}
											</th>
										)
									}
									return (<th style={borderStyle}><a href="#" onClick={(e)=>{e.preventDefault();this.columnClick(colName)}}>{colName}</a></th>)
								})
							}
							</tr>
							</thead>
							<tbody>
								{
									data.map((obj)=>{
										return(<tr>
											
											{
												Object.keys(obj).map((key)=>{
													return(<td style={borderStyle}>{obj[key]}</td>)
												})
											}

											</tr>)
									})
								}
							</tbody>
						</table>
					</div>
			)
		}
		/*shouldComponentUpdate(nextProps,nextState){
			if(nextState.noOfRec != this.state.noOfRec){
				return false;
			}
			return true;
		}*/
		getManipulatedData(){
			var dummyData = [
		      {
		        id: '1',
		        threadID: 't_1',
		        threadName: 'Jing',
		        authorName: 'Bill',
		        text: 'Hey Jing, want to give a Flux talk at ForwardJS?',
		        timestamp: Date.now() - 99999
		      },
		      {
		        id: '2',
		        threadID: 't_1',
		        threadName: 'Jing',
		        authorName: 'Billy',
		        text: 'Seems like a pretty cool conference.',
		        timestamp: Date.now() - 89999
		      },
		      {
		        id: '3',
		        threadID: 't_1',
		        threadName: 'Bill',
		        authorName: 'Jing',
		        text: 'Sounds good.  Will they be serving dessert?',
		        timestamp: Date.now() - 79999
		      },
		      {
		        id: '4',
		        threadID: 't_2',
		        threadName: 'Dave',
		        authorName: 'Bill',
		        text: 'Hey Dave, want to get a beer after the conference?',
		        timestamp: Date.now() - 69999
		      },
		      {
		        id: '5',
		        threadID: 't_2',
		        threadName: 'Billy',
		        authorName: 'Dave',
		        text: 'Totally!  Meet you at the hotel bar.',
		        timestamp: Date.now() - 59999
		      },
		      {
		        id: '6',
		        threadID: 't_3',
		        threadName: 'Brian',
		        authorName: 'Bill',
		        text: 'Hey Brian, are you going to be talking about functional stuff?',
		        timestamp: Date.now() - 49999
		      },
		      {
		        id: '7',
		        threadID: 't_3',
		        threadName: 'Bill',
		        authorName: 'Brian',
		        text: 'At ForwardJS?  Yeah, of course.  See you there!',
		        timestamp: Date.now() - 39999
		      }
		    ]

		    var data = this.sort(dummyData,this.state.sortColumn);

		    var start = this.state.noOfRec * (this.state.pageNo-1)
		    var end = 	this.state.noOfRec * (this.state.pageNo)

		    if(end>data.length){
		    	end = data.length
		    }
		    //console.log("start" + start)
		    //console.log("end " + end)
		    return data.slice(start,end);
			//seacrch
			//if(this.state.sortColumn != null){

			//}
		}
		sort(data,propName){
			data.sort((a,b)=>{
				var result = (a[propName]>b[propName]) ? 1 : (a[propName]==b[propName] ? 0 : -1)
				return result * this.state.sortOrder;
			})
			return data;
		}
}

const mapStateToProps = (state)=>{
	return {
		apiData : state.apiReducer.data,
		isFetching: state.apiReducer.fetching,
		didReceived: state.apiReducer.received
	}
};

const mapDisptchToProps = (dispatch)=>{
	return {
		getData : (id)=>{
			//console.log('api clicked')
			dispatch(actions.getDataFromApi(actions,id))
		}
	}
};

const pageNt = connect(mapStateToProps,mapDisptchToProps)(pageNtt);

module.exports = pageNt;