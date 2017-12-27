import * as actionTypes from '../constants/addfile.js'

const initialState = {
	add:{},
	success:{},
	list:{},
	data:{},
	added:{}
}

export default function addfile(state = initialState,action){
	switch(action.type){
		case actionTypes.ALL_LIST:
			state.list = {}
			return {
				...state,
				add:action.add
			}
		case actionTypes.SUCCESS:
			return {
				...state,
				success:action.success
			}
		case actionTypes.LIST:
			state.add = {}
			return {
				...state,
				list:action.list
			}
		case actionTypes.SELECT_FILE:
			return {
				...state,
				data:action.data
			}
		case actionTypes.ADDED:
				return {
					...state,
					added:action.added
				}
		default:
			return state
	}

}