import fetch from 'isomorphic-fetch'
import * as actionTypes from '../constants/addfile.js'
const baseUrl = 'https://nccloud.weihong.com.cn/nccloudOLhelp/';

export function list(data){
	//const lurl = baseUrl + "user/addtitleslist/?username="+name+"&token="+token;
  const text = "http://172.16.11.71:3008/search/searchBookName?q=" + data;
	return displatch =>{
		return fetch(text)
			.then(res => res.json())
			.then(json => {
        displatch({type:'ALL_LIST',add:json})
				console.log(json)
			})
	}
}

export function addMenu(obj){
  console.log(obj)
  const text = "http://172.16.11.71:3008/search/saveCatalog?";
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