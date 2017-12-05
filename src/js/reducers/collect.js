import * as actionTypes from '../constants/collect'

const initialState = {
	collect:{},
	del:{},
	chart:{},
	current:{},
	auto:{},
	val:{},
	max:{},
	save:{},
	page:{}
}
let collect = {}
let del = {}
let chart = {}
let current = {}
let auto = {}
let val = {}
let max = {}
let save = {}
let page = {}
export default function collect(state = initialState,action){
	switch (action.type) {
		case actionTypes.MYCOLLECT:
			state.collect = action.collect;
			state.chart = {}
			return {
				...state,
				collect:action.collect
			}
		case actionTypes.MAX_PAGE:
			//max = JSON.parse(JSON.stringify(action))
			state.max = action.max;
			return {
				...state,
				max:action.max
			}
		case actionTypes.FIND_FILE:
			state.collect = {}
			return {
				...state,
				chart:action.chart
			}
		case actionTypes.DELETE:
			return {
				...state,
				del:action.del
			}
		case actionTypes.AUTO_COLLECT:
			auto =JSON.parse(JSON.stringify(action))
			state.auto = action.auto;
			return {
				...state,
				auto:action.auto
			}  		
		case actionTypes.CURRENT_COLLECT:
			state.current = action.current;
   			return {
   				...state,
   				current:action.current
   			}
		case actionTypes.SEARCH_ALL:
			state.chart = action.chart;
			state.collect = {};
			return {
				...state,
				chart:action.chart
			}
   		case actionTypes.VAL_COLLECT:
   			val = JSON.parse(JSON.stringify(action))
   			state.val = action.val;
   			return {
   				...state,
   				val:action.val
   			}
	    case actionTypes.PAGE:
	    	state.page = action.page
	    	return {
	    		...state,
	    		page:action.page
	    	}
	    case actionTypes.SAVE_COLLECT:
	    	save = JSON.parse(JSON.stringify(action))
	    	state.save = action.save;
	    	return {
	    		...state,
	    		save:action.save
	    	}
      	case actionTypes.INPUT_VALUE:
      		state.collect = {}
      		let val = action.val;
      		if(val!==""){
      			return {
	      			...state,
	      			val:action.val
      			}	
      		}
		default:
			return state
	}
}