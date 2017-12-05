import * as actionTypes from '../constants/fileOne';

const initialState = {}
let chart = {}
let auto = {}
let current = {}
export default function fileOne(state = initialState,action){
  switch(action.type) {
  	case actionTypes.FIND_FILE_ONE:
      chart = action
      return Object.assign(current,auto,action);
    case actionTypes.TWO_MENU:
    	return action
    case actionTypes.PAGE_ONE:
      return action
    case actionTypes.AUTO_ONE:
      auto = action
      return Object.assign(current,chart,action)
    case actionTypes.CURRENT_ONE:
      current = action
      return Object.assign(auto,chart,action)
    default:
      return state
  }
}