import { createStore,thunk,applyMiddleware,compose } from 'redux'
import rootReducer from '../reducers'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(ReduxThunk,logger)
      )
  )
  store.subscribe(function(){
  	
  })
  //console.log(store.subscribe(this.onStateChange.bind(this)))
  return store
} 