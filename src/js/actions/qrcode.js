import fetch from 'isomorphic-fetch'
import * as actionTypes from '../constants/qrcode'
const baseUrl = 'https://nccloud.weihong.com.cn/nccloudOLhelp/';
//const baseUrl = "http://139.224.55.30:3003/";
//const baseUrl = "http://172.16.11.70:3008/";
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
					dispatch({type:'WECHAT',wechat:res})
				})
			}
		})
	}
}

//搜文档
export function findErr(err,page,type){
	err = err.trim();
	let str = encodeURIComponent(err)
	let furl;
	if(type){
		furl = baseUrl + "search/getTitleAndHtmlUrl?q=" + str + "&page=" + page + "&type=" + type;
	}else{
		furl = baseUrl + "search/getTitleAndHtmlUrl?q=" + str + "&page=" + page + "&type=";
	
	}
	return dispatch => {
		return fetch(furl)
			.then(res => res.json())
			.then(json =>{
				if(json.result=="success"&&json.message.objArray)
				dispatch({type:'ERROR_SEARCH',err:json.message})
			})
	}
}

//跳转页面存值
export function saveValue(val,page,all){
	let obj = {};
	obj.val = val;
	obj.page = page;
	obj.all = all
	return dispatch => {
		dispatch({type:'QRCODE_VALUE',save:obj})
	}
}
//搜全站
export function searchAll(val,page){
	val = val.trim();
	let str = encodeURIComponent(val);
	const surl = baseUrl + "search/getTitleAndHtmlUrl?q=" + str + "&page=" + page + "&type=";
	return dispatch => {
		return fetch(surl)
			.then(res => res.json())
			.then(json => {
				if(json.result=="success"&&json.message.objArray)
				dispatch({type:'QRCODE_ALL',chart:json.message})
			})
	}
}

export function saveWarning(body,token){
	let wurl = baseUrl + "user/saveinfo?token=" + token;
	return dispatch => {
		return fetch(wurl,{
			method:'POST',
			mode: 'no-cors',
			headers:{
				'Accept':'application',
				'Access-Control-Allow-Origin':'*'
			
			},
			body:JSON.stringify(body),
		}).then((res) => {
			if(res.ok) {
				res.json().then(res => {
					dispatch({type:'SAVEWARNING',warning:res})
				})
			}
		})
	}
}

