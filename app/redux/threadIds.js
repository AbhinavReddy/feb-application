const threadIds = (state={ids:[1,2,3],currentId:null},action) =>{
	//console.log("in reducer threadIds");
	switch(action.type){
		case 'GetNewIds' :
			return Object.assign({},state,{ids : action.ids});
		
		case 'SelectId' :
			//console.log("in reducer threadIds SelectId");
			return Object.assign({},state,{currentId:action.id});
		default :
			//console.log("in reducer threadIds default");
			return state;
	};
};

module.exports = threadIds;