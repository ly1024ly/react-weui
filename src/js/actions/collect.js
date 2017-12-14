import fetch from 'isomorphic-fetch'
import * as actionTypes from '../constants/collect';
//const baseUrl = "http://172.16.11.70:3008/";
const baseUrl = 'https://nccloud.weihong.com.cn/nccloudOLhelp/';
//const baseUrl = "http://139.224.55.30:3003/";
let collect;
//搜索本页
export function search(data,string){
	console.log(data,string)
  let str = encodeURIComponent(string);
  const url = baseUrl + 'search/searchMystore?username=' + data+'&string='+str;
  return dispatch => {
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        dispatch({type:'FIND_FILE',chart:json})
      })
  }
}

//获得当前用户的收藏
export function getCollect(para){
	const url = baseUrl + "search/mystore?username="+para;
	return dispatch =>{
		return fetch(url)
			.then(res => res.json())
			.then(json => {
				collect = json;
				dispatch({type:'MYCOLLECT',collect:json})
			})
	}
}

//删除
// export function deCollect(obj,obj1){
// 	console.log(obj1)
// 	const curl = baseUrl + "search/storeup?";
// 	return dispatch => {
// 		return fetch(curl,{
// 			method:'POST',
// 			headers:{
// 				'Accept':'application/json',
// 				'Content-Type':'application/json'
// 			},
// 			body:JSON.stringify(obj)
// 		}).then((res) => {
// 			if(res.ok) {
// 				res.json().then(res => {
// 					if(res.result=="success"){
// 						dispatch({type:'DELETE',del:obj.topicid})
// 					}else{
// 						dispatch({type:'DELETE',del:null})
// 					}
					
// 				})
// 			}
// 		})
// 	}

// }
//删除搜藏
export function deCollect(obj,obj1){
	console.log("T&")
	const curl = baseUrl + "search/storeup?";
	return dispatch => {
		return fetch(curl,{
			method:'POST',
			headers:{
				'Accept':'application/json',
				'Content-Type':'application/json'
			},
			body:JSON.stringify(obj)
		}).then((res) => {
			if(res.ok) {
				res.json().then(res => {
					console.log("&&&&&&&&&&&&&")
					console.log(res)
					if(res.result=="success"){
						var newObj = delArr(obj.topicid,obj1);
						
						dispatch({type:'MYCOLLECT',collect:newObj})
					}
				})
			}
		})
	}

}
function delArr(id,obj){
	let newArr = [];
	let o = obj;
	o.flag = "delete";
	for(var i=0;i<obj.message.length;i++){
		if(id==obj.message[i].result.topicid){

		}else{
			newArr.push(obj.message[i])
		}
	}
	o.message = newArr;
	return o
}
//搜全栈
export function searchAll(q,page){
	let str = encodeURIComponent(q)
	const url = baseUrl + "search/getTitleAndHtmlUrl?q=" + str +"&page=" + page +"&type=";
	return dispatch => {
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        if(json.message.Maxpage){
          dispatch({type:'MAX_PAGE',max:json.message.Maxpage})
        }
        dispatch({type:'SEARCH_ALL',chart:json})
      })
  }
}

//得到点击搜寻的当前页面
export function current(index){
  return dispatch => {
    dispatch({type:'CURRENT_COLLECT',current:index})
  }
}
export function page(pre){
  return dispatch => {
    let json = parseInt(pre);
    dispatch({type:'AUTO_COLLECT',auto:json})
  }
}


//进入iframe页面时将搜藏的值和搜索框的值存下来
export function saveValue(obj,str){
	return dispatch => {
		if(str=="collect"){
			dispatch({type:'MYCOLLECT',collect:obj})
		}else{
			dispatch({type:'FIND_FILE',chart:obj})
		}
	}
}

//当前页数
export function cpage(page){
	return dispatch =>{
		dispatch({type:'PAGE',page:page})
	}
}

//input value

export function inputVal(data){
	return dispatch =>{
		dispatch({type:'INPUT_VALUE',val:data})
	}
}

