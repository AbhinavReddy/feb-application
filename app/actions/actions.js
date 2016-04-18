import fetch from 'isomorphic-fetch'

var actions = {
	idClickAction : (id) => {
    //console.log('id clickkkkked');
    var data2;
		dummyData.forEach((data)=>{
      if(data.id == id){
        data2=data;
      }
    });
    console.log("idddddC1");
    return dispatch =>{
      console.log("idddddC2");
      dispatch({
          type : 'SelectId',
          id : id,
          data : data2
        });
    }
	},
  getAllData : () => {
    return dummyData.map((data)=>{
      return data.id;
    });
    //console.log('111');
  },
  authorAction : (dispatch,author) => {
    //console.log('author clickkkkked');
    var data2;
    dummyData.forEach((data)=>{
      if(data.authorName == author){
        data2=data;
      }
    });
    //console.log(data2);
    dispatch({
          type : 'SelectId',
          id : data2.id,
          data : data2
        });
  },
  fetchingDataApi : (id)=>{
    //console.log('FetchingdatafromApi for '+id);
    return {type:'FetchingdatafromApi'}
  },
  receivedData : (id,data)=>{
    //console.log('ReceivingdatafromApi for '+id)
    //console.log(JSON.stringify(data))
    return {
         type:'ReceivingdatafromApi',
         id: id,
         data : data
    }
  },
  getDataFromApi : (actions,id) => {
      //console.log('in actions getDataFromApi  '+id)
        return dispatch=>{
          //console.log('in actions getDataFromApi1234')
          dispatch(actions.fetchingDataApi(id))
          return fetch("https://query.yahooapis.com/v1/public/yql?q="+
                        "select * from weather.forecast where woeid in "+
                        "(select woeid from geo.places(1) where text='London')&format="+
                        "json")
                  .then(response=>{
                        if (response.status >= 400) {
                            throw new Error("Bad response from server");
                        }
                        return response.json()
                      })
                  .then(json=>dispatch(actions.receivedData(id,json)))
        }
    }
  };

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
    ];

module.exports = actions;
