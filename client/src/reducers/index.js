import { combineReducers } from 'redux'

import studentsReducer from './studentsReducer'
import constraintsReducer from './constraintsReducer'
import historyReducer from './historyReducer'
import uiReducer from './uiReducer'
import teacherReducer from './teacherReducer'

const rootReducer = combineReducers({ students: studentsReducer, constraints: constraintsReducer, teacher: teacherReducer, history: historyReducer, uiData: uiReducer })

export default rootReducer
