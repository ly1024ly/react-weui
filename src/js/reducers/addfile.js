import * as actionTypes from '../constants/addfile.js'

const initialState = {
	add:{},
	success:{}
}

export default function addfile(state = initialState,action){
	switch(action.type){
		case actionTypes.ALL_LIST:
			return {
				...state,
				add:action.add
			}
		case actionTypes.SUCCESS:
			return {
				...state,
				success:action.success
			}
		default:
			return state
	}

}