import fetch from 'isomorphic-fetch'
import * as actionTypes from '../constants/fileOne';
//const baseUrl = "http://172.16.11.70:3008/";
const baseUrl = "https://nccloud.weihong.com.cn/nccloudOLhelp/";
//const baseUrl = "http://139.224.55.30:3003/";
// export function twoMenu(data){
//   const turl = "http://139.224.55.30:3003/search/secondcons?q=" + data;
//   return dispatch => {
//     return fetch(turl)
//       .then(res => res.json())
//       .then(json => {
//         dispatch({type:"TWO_MENU",two:json})
//       })
//   }
// }
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
          dispatch({type:'PAGE_ONE',page:json.message.Maxpage})
        }
        dispatch({type:'FIND_FILE_ONE',chart:json})
      })
  }
}

// export function twoMenu(data){
//   const turl = baseUrl + "search/secondcons?q=" + data;
//     return dispatch =>{
//         return fetch(turl)
//             .then(res =>res.json())
//             .then(json =>{
//               if(json.result == "success"){
//                 if(data=="驱动器错误码"){
//                   let json1 = json;
//                   json1.index = 1;
//                   dispatch({type:"TWO_MENU",two:json1})
//                 }else{
//                   let json2 = json;
//                   json2.index = 0;
//                   dispatch({type:"TWO_MENU",two:json2})
//                 }
//               }
//             })
//     }
// }
export function twoMenu(data){
  const test = "https://nccloud.weihong.com.cn/nccloudOLhelp/search/getCatalogIndex?bookid="+data.id+"&bookname="+data.bookname;
    return dispatch =>{
        return fetch(test)
            .then(res =>res.json())
            .then(json =>{
              dispatch({type:"TWO_MENU",two:json})
            })
    }
}

//得到点击搜寻的当前页面
export function current(index){
  console.log(index)
  return dispatch => {
    dispatch({type:'CURRENT_ONE',current:index})
  }
}
export function page(pre){
  return dispatch => {
    let json = parseInt(pre);
    dispatch({type:'AUTO_ONE',auto:json})
  }
}