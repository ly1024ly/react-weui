import * as actionTypes from '../constants/iframe'

const initialState = {
	
} 
let is = {}
let luad = {}
let store = {}
let key = {}
let id = {}
let like = {}
let wechat = {}
export default function(state = initialState,action){
	switch(action.type){
		case actionTypes.LIKE:	
			like = JSON.parse(JSON.stringify(action))
			return {
				...state,
				like:action.like
			}
		case actionTypes.SAVELIKE:
			is = JSON.parse(JSON.stringify(action))
			return {
				...state,
				is:action.is
			}
		case actionTypes.COLLECT_FILE:
			return {
				...state,
				collect:action.collect
			}
		case actionTypes.CLEAR:
			return action
		case actionTypes.INITIAL_WECHAT:
			return {
				...state,
				wechat:wechat
			}
		case actionTypes.DEL_COLLECT:
			return {
				...state,
				delc:action.delc
			}
		case actionTypes.LUAD:
			luad = JSON.parse(JSON.stringify(action))
			return {
				...state,
				luad:action.luad
			}
		case actionTypes.STORE:
			store = JSON.parse(JSON.stringify(action))
			return {
				...state,
				store:action.store
			}
		case actionTypes.GET_KEYWORD:
			key = JSON.parse(JSON.stringify(action))
			return {
				...state,
				key:action.key
			}
		case actionTypes.TOPICID:
			id = JSON.parse(JSON.stringify(action))
			return {
				...state,
				id:action.id
			}
		default:
			return state
	}
}
