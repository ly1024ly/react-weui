import * as actionTypes from '../constants/qrcode'


const initialState = {
	wechat:{},
	err:{},
	save:{},
	chart:{},
	warning:{}
}

export default function(state = initialState,action){
	switch(action.type){
		case actionTypes.WECHAT:
			return {
				...state,
				wechat:action.wechat
			}
		case actionTypes.ERROR_SEARCH:
			state.chart = {}
			return {
				...state,
				err:action.err
			}
		case actionTypes.QRCODE_VALUE:
			return {
				...state,
				save:action.save
			}
		case actionTypes.QRCODE_ALL:
			state.err = {}
			return {
				...state,
				chart:action.chart
			}
		case actionTypes.SAVEWARNING:
			state.warning = {}
			return {
				...state,
				warning:action.warning
			}
		default:
			return state
	}
}
