import * as actionTypes from '../constants/maintenance'


const initialState = {
	submit:{},
	time:{},
	wechat:{},
	image:{}
}


export default function(state = initialState,action){
	switch(action.type){
		case actionTypes.SUBMIT:
			return{
				...state,
				submit:action.submit
			}
		case actionTypes.TIME:
			return{
				...state,
				time:action.time
			}
		case actionTypes.WECHAT:
			return {
				...state,
				wechat:action.wechat
			}
		case actionTypes.IMAGE:
			return{
				...state,
				image:action.image
			}
		case actionTypes.CLEARDATA:
			return{
				time:state.time,
				wechat:state.wechat,
				image:state.image,
				submit:{}
			}
		default:
			return state
	}
}