import { combineReducers } from 'redux'

import studentsReducer from './studentsReducer'
import constraintsReducer from './constraintsReducer'
import historyReducer from './historyReducer'
import uiReducer from './uiReducer'

const rootReducer = combineReducers({ students: studentsReducer, constraints: constraintsReducer, history: historyReducer, uiData: uiReducer })

export default rootReducer
