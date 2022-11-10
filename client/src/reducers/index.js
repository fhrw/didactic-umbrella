import { combineReducers } from 'redux'

import studentsReducer from './studentsReducer'
import constraintsReducer from './constraintsReducer'
import uiReducer from './uiReducer'

const rootReducer = combineReducers({ students: studentsReducer, constraints: constraintsReducer, uiData: uiReducer })

export default rootReducer
