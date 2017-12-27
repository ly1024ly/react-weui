import fetch from 'isomorphic-fetch'
import * as actionTypes from '../constants/addfile.js'
const baseUrl = 'https://nccloud.weihong.com.cn/nccloudOLhelp/';

export function list(data){
	//const lurl = baseUrl + "user/addtitleslist/?username="+name+"&token="+token;
  const text = "https://nccloud.weihong.com.cn/nccloudOLhelp/search/searchBookName?q=" + data;
	return (displatch,getState) =>{
		return fetch(text)
			.then(res => res.json())
			.then(json => {
        console.log(getState())
        let arr1 = getState().addfile.data;
        let a = checkv(arr1,json);
        
        displatch({type:'ADDED',added:a})
        displatch({type:'ALL_LIST',add:json})
				console.log(json)
			})
	}
}

function checkv(arr1,arr2){
    let bname = [];
    if(arr1.result=="success"&&arr2.result=="success"){
      for(var i=0;i<arr1.message.length;i++){
          for(var j=0;j<arr2.message.length;j++){
            console.log(arr1.message[i].bookid,arr2.message[j].id)
              if(arr1.message[i].bookid==arr2.message[j].id){
                  bname.push(arr2.message[j].id)
              }
          }
       }
    }
    console.log("banem");
    console.log(arr1,arr2)
  return bname
}

export function addMenu(obj){
  console.log(obj)
  const text = "https://nccloud.weihong.com.cn/nccloudOLhelp/search/saveCatalog?";
  let o = JSON.stringify(obj);
  console.log(o)
  return displatch => {
    return fetch(text,{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:o
    }).then((res) => {
      if(res.ok){
        res.json().then(res => {
          displatch({type:'SUCCESS',success:res})
        })
      }
    })
  }
}

export function all(name){
  const text = "https://nccloud.weihong.com.cn/nccloudOLhelp/search/getAllCatalog?username=" + name;
  return dispatch => {
    return fetch(text)
      .then(res => res.json())
      .then(json => {
        dispatch({type:'LIST',list:json})
      })
        
  }
}

export function file(name){

  //const ourl = baseUrl + "user/titlelist/?username="+name+"&token="+token;
  const text = "https://nccloud.weihong.com.cn/nccloudOLhelp/search/myCatalog?username=" + name;
  return (dispatch,getState) => {
    return fetch(text)
      .then(res => res.json())
      .then(json => {

        dispatch({type:'SELECT_FILE',data:json})
      })
        
  }

}
