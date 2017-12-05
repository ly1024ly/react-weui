import fetch from 'isomorphic-fetch'
import * as actionTypes from '../constants/iframe'
const baseUrl = "https://nccloud.weihong.com.cn/nccloudOLhelp/";
//const baseUrl = "http://172.16.11.70:3008/";
//const baseUrl = "http://139.224.55.30:3003/";
//点赞
let luad = false;
let store = false;
export function like(obj){
	const url = baseUrl + "search/laud?";
	return dispatch => {
		return fetch(url, {
			method: 'POST',
			headers:{
				'Accept':'application/json',
				'Content-Type':'application/json'
			},
			body:JSON.stringify(obj),
		}).then((res) => {
			if(res.ok) {
				res.json().then(res => {
					if(res.result=="success"){
						dispatch({type:'LUAD',luad:true})
					}
					dispatch({type:'LIKE',like:res})
				})
			}
		})
	}
}
//微信初始化
export function wechat(){
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
					dispatch({type:'INITIAL_WECHAT',wechat:res})
				})
			}
		})
	}
}
//收藏
export function collect(obj){
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
					if(res.result=="success"){
						dispatch({type:'STORE',store:true})
					}
					dispatch({type:'COLLECT_FILE',collect:res})
				})
			}
		})
	}
}
//取消收藏
export function delCollect(obj){
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
					if(res.result=="success"){
						dispatch({type:'STORE',store:false})
					}
					dispatch({type:'DEL_COLLECT',delc:res})
				})
			}
		})
	}
}


//进入页面判断是否点赞收藏分享
export function saveLike(message){
	const iurl = baseUrl + "search//filename/allstatus?username="+message.username+"&topicid="+message.topicid;
	return dispatch => {
		return fetch(iurl)
			.then(res =>res.json())
			.then(json => {
				if(json.result=="success"){
					dispatch({type:'LUAD',luad:json.luad});
					dispatch({type:'STORE',store:json.store});
				}
				dispatch({type:'SAVELIKE',is:json})
			})
	}
}

//清除数据
export function clear(){
	return dispatch =>{
		dispatch({type:'CLEAR'})
	}
}
//获取关键字
export function keyword(key){
	console.log(key)
	const kurl = baseUrl + "search/getkeyworlds?topicid="+key;
	return dispatch => {
		return fetch(kurl)
			.then(res =>res.json())
			.then(json => {
				console.log(json)
				dispatch({type:'GET_KEYWORD',key:json})
			})
	}
}