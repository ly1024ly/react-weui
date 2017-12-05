import * as actionTypes from '../constants/fileSearch';

const initialState = {}
let chart = {}
let auto = {}
let current = {}
let message = {}
let wechat = {}
export default function fileSearch(state = initialState,action){
  switch(action.type) {
    case actionTypes.FIND_SEARCH:
      chart = JSON.parse(JSON.stringify(action))
      // return  {
      //           ...state,
      //           current:current,
      //           auto:auto,
      //           chart:action
      //         }

      return Object.assign({},state,current,auto,chart,wechat)
    case actionTypes.CURRENT_PAGE:
      return Object.assign({},action,wechat)
    case actionTypes.TWO_MENU:
      return action
    case actionTypes.THREE_MENU:
      return action
    case actionTypes.BACK:
      return action
    case actionTypes.PAGE:
      return action
    case actionTypes.AUTO:
      auto = JSON.parse(JSON.stringify(action))
      return Object.assign({},state,current,auto,chart,wechat)
    case actionTypes.CURRENT:
      current = JSON.parse(JSON.stringify(action))
      return Object.assign({},state,current,auto,chart,wechat)
    case actionTypes.SAVE_VALUE:
      return action
    case actionTypes.VAL:
      return action
    case actionTypes.INIT_WECHART:
      wechat = JSON.parse(JSON.stringify(action))
      return Object.assign({},state,current,message,chart,wechat)
    case actionTypes.MESSAGE:
      message = JSON.parse(JSON.stringify(action))
      return Object.assign({},state,current,message,chart,wechat)
    default:
      return state
  }
}