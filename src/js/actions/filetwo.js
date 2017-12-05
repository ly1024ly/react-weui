import fetch from 'isomorphic-fetch'
import * as actionTypes from '../constants/fileTwo';
//const baseUrl = "http://172.16.11.70:3008/";
const baseUrl = "https://nccloud.weihong.com.cn/nccloudOLhelp/";
//const baseUrl = "http://139.224.55.30:3003/";

export function threeMenu(data,one){
  let str = encodeURIComponent(data);
  const rurl = baseUrl + "search/thirdcons?q=" + str +"&firstContent="+one;
  return dispatch => {
    return fetch(rurl)
      .then(res => res.json())
      .then(json => {
        dispatch({type:'THREE_MENU',three:json})
      })
  }
}

//搜索
export function search(data,page){
  let str = encodeURIComponent(data);
  let obj = {};
  const url = baseUrl + 'search/getTitleAndHtmlUrl?q=' + str +'&page='+page;
  return dispatch => {
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        if(json.message.Maxpage){
          dispatch({type:'PAGE_TWO',page:json.message.Maxpage})
        }
        dispatch({type:'FIND_FILE_TWO',chart:json})
      })
  }
}

//得到点击搜寻的当前页面
export function current(index){
  console.log(index)
  return dispatch => {
    dispatch({type:'CURRENT_TWO',current:index})
  }
}
export function page(pre){
  return dispatch => {
    let json = parseInt(pre);
    dispatch({type:'AUTO_TWO',auto:json})
  }
}