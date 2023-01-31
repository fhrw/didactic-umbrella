import { combineReducers } from 'redux'

import studentsReducer from './studentsReducer'
import constraintsReducer from './constraintsReducer'
import historyReducer from './historyReducer'
import uiReducer from './uiReducer'
import teacherReducer from './teacherReducer'
import slotReducer from './slotReducer'
import lockReducer from './lockReducer'

const rootReducer = combineReducers({ students: studentsReducer, constraints: constraintsReducer, locks: lockReducer, teacher: teacherReducer, slots: slotReducer, history: historyReducer, uiData: uiReducer })

export default rootReducer
