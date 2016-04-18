const apiReducer = (state={data:{},id:null,fetching:false,received:false},action) =>{
	switch(action.type){
		case 'FetchingdatafromApi':
			console.log("Reducer FetchingdatafromApi")
			return {
				data : action.data,
				id : action.id,
				fetching : true,
				received : false
			}
		case 'ReceivingdatafromApi':
			console.log("Reducer ReceivingdatafromApi")
			return {
				data : action.data,
				id : action.id,
				fetching : false,
				received : true
			}
		default : 
			return state;
	}
}

module.exports = apiReducer;