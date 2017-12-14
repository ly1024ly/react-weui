import { combineReducers } from 'redux'
import fileSearch from './fileSearch'
import fileone from './fileone'
import filetwo from './filetwo'
import collect from './collect'
import iframe from './iframe'
import qrcode from './qrcode'
import maintenance from './maintenance'
import addfile from './addfile'

const rootReducer = combineReducers({
  fileSearch,
  fileone,
  filetwo,
  collect,
  iframe,
  qrcode,
  addfile,
  maintenance
})

export default rootReducer