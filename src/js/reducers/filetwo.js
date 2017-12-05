import * as actionTypes from '../constants/fileTwo';


const initialState = {}
let chart = {}
let auto = {}
let current = {}
export default function fileOne(state = initialState,action){
  switch(action.type) {
   	case actionTypes.FIND_FILE_TWO:
      chart = action
      return Object.assign(current,auto,action);
    case actionTypes.THREE_MENU:
    	return action
    case actionTypes.AUTO_TWO:
      auto = action
      return Object.assign(current,chart,action)
    case actionTypes.PAGE_TWO:
      return action
    case actionTypes.CURRENT_TWO:
      current = action
      return Object.assign(auto,chart,action)
    default:
      return state
  }
}