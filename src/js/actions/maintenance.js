import fetch from 'isomorphic-fetch';
import * as actionTypes from '../constants/maintenance';
const iurl = "http://172.16.11.70:3008/search/";
var $ = require("jquery")

export function submitValue(body){
	console.log("****************************")
	console.log(body)
	let data = JSON.stringify(body);
	var headers = new Headers();
	
	const url = "https://nccloud.weihong.com.cn/nccloudOLhelp/search/repairService?";
	//const url ="http://172.16.11.70:3008/search/repairService?";
	return dispatch => {
		return fetch(url,{
			method:'POST',
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
			mode: "cors",
			body:data,
		}).then((res) => {
			console.log(res)
			if(res.ok) {
				res.json().then(res => {
					console.log(res)
					dispatch({type:'SUBMIT',submit:res})
				})
			}
		}).catch(function(error) {
		  console.log('There has been a problem with your fetch operation: ' + error.message);
		});
		
	}
}

export function timeChange(str){
	return dispatch => {
		return dispatch({type:'TIME',time:str})
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
					dispatch({type:'WECHAT',wechat:res})
				})
			}
		})
	}
}

export function uploadImage(data){
	console.log(data)
	const iurl = 'https://nccloud.weihong.com.cn/nccloudOLhelp/search/saveimg';
	//const iurl = 'http://172.16.11.70:3008/search/saveimg?';
	return dispatch => {
		console.log("ok")
		return fetch(iurl,{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			mode:"no-cors",
			body:JSON.stringify(data)
		}).then((res) => {
			console.log(res)
			if(res.ok) {
				res.json().then(res => {
					console.log(res)
					dispatch({type:'IMAGE',image:res})
				})
			}
		}).catch(function(error) {
		  console.log('There has been a problem with your fetch operation: ' + error.message);
		});
	}	
}

export function cleardata(){
	return dispatch=>{
		dispatch({type:'CLEARDATA'})
	}
}