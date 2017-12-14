import fetch from 'isomorphic-fetch'
import * as actionTypes from '../constants/fileSearch';
let back = [];
const baseUrl = "https://nccloud.weihong.com.cn/nccloudOLhelp/";
//const baseUrl = "http://172.16.11.70:3008/";
//const baseUrl = "http://139.224.55.30:3003/";
//搜索
export function search(data,page,type){
  let str = encodeURIComponent(data);
  let obj = {};
  let url;
  if(type){
    url = baseUrl + 'search/getTitleAndHtmlUrl?q=' + str +'&page='+page+"&type="+type;
  }else{
    url = baseUrl + 'search/getTitleAndHtmlUrl?q=' + str +'&page='+page+"&type=";
  }
  return function(dispatch,getState){
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        if(json.message.Maxpage){
          dispatch({type:'PAGE',page:json.message.Maxpage})
        }
       // console.log( Object.assign(obj,getState()))
        dispatch({type:'FIND_SEARCH',chart:json})
      })
  }
}

//得到点击搜寻的当前页面
export function current(index){
  return function(dispatch,getState){
    dispatch({type:'CURRENT',current:index})
  }
}
export function page(pre){
  return dispatch => {
    let json = parseInt(pre);
    dispatch({type:'AUTO',auto:json})
  }
}

//一级目录
  
// export function file(){
//   const ourl = baseUrl + "search/firstContent?";
//   return dispatch => {
//     return fetch(ourl)
//         .then(res => res.json())
//         .then(json => {
//           dispatch({type:'CURRENT_PAGE',data:json})
//         })
//   }
// }

export function file(name,token){

  const ourl = baseUrl + "user/titlelist/?username="+name+"&token="+token;
  const text = "http://172.16.11.71:3008/search/addCatalog?"
  return dispatch => {
    return fetch(text)
      .then(res => res.json())
      .then(json => {
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log(json)
        dispatch({type:'CURRENT_PAGE',data:json})
      })
        
  }

}

function findFile(arr,key){
  let result;
  for(var i =0;i<arr.length;i++){
    if(arr[i].key == key){
      result = arr[i].val;
    }
  }
  return result
}

//清除数据
export function clear(){
  return dispatch =>{
    dispatch({type:'CLEAR'})
  }
}

export function saveValue(obj,a){
  return dispatch =>{
     if(obj.save){
      dispatch({type:"SAVE_VALUE",save:obj.save,val:a})
     }else{
      dispatch({type:"SAVE_VALUE",save:obj,val:a})
     }
     
  }
}

export function promtMessage(data){
   let str = encodeURIComponent(data);
   let url = baseUrl + 'search/getTitleAndHtmlUrl?q=' + str +'&page=1&type=';
   return function(dispatch,getState){
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        let arr = [];   
        console.log(json)
        if(json.result=="success"&&json.message.objArray){
          let objArray = json.message.objArray;
          for(var i=0;i<objArray.length;i++){
            arr.push(objArray[i].title)
          }
        } 
        dispatch({type:'MESSAGE',message:arr})
      })
  }
}

export function wechart(){
  const wurl = "https://nccloud.weihong.com.cn/weixin/jssdksignature";
  const body = {
    url:location.href.split("#")[0]
  };
  return dispatch => {
    return fetch(wurl,{
      method:'POST',
      headers:{
        'Accept':'application',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(body),
    }).then((res) => {
      if(res.ok) {
        res.json().then(res => {
          dispatch({type:'INIT_WECHART',wechat:res})
        })
      }
    })
  }
}
