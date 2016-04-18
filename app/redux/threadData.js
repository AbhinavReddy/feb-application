const threadData = (state={data:{}},action)=>{
	//console.log("in reducer threadData");
	switch(action.type){
		case 'SelectId' :
			//console.log("in reducer threadData SelectId");
			//console.log("data  -- >"+action.data);
			return {data:action.data};
		
		default :
			//console.log("in reducer threadData default");
			return state;
	};
};

module.exports = threadData;