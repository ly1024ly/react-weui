import * as actionTypes from '../constants/iframe'

const initialState = {} 
let is = {}
let luad = {}
let store = {}
let key = {}
export default function(state = initialState,action){
	switch(action.type){
		case actionTypes.LIKE:	
			return Object.assign({},luad,store,key)
		case actionTypes.SAVELIKE:
			is = JSON.parse(JSON.stringify(action))
			return Object.assign({},luad,store,key)
		case actionTypes.COLLECT_FILE:
			return Object.assign({},luad,store,key)
		case actionTypes.CLEAR:
			return action
		case actionTypes.INITIAL_WECHAT:
			return Object.assign(is,luad,store,state,action);
		case actionTypes.DEL_COLLECT:
			return Object.assign({},key,luad,JSON.parse(JSON.stringify(action)))
		case actionTypes.LUAD:
			luad = JSON.parse(JSON.stringify(action))
			return luad
		case actionTypes.STORE:
			store = JSON.parse(JSON.stringify(action))
			return Object.assign({},key,luad,store)
		case actionTypes.GET_KEYWORD:
			key = JSON.parse(JSON.stringify(action))
			return Object.assign({},state,luad,store,key)
		default:
			return state
	}
}
