import { combineReducers } from 'redux'

import studentsReducer from './studentsReducer'
import constraintsReducer from './constraintsReducer'

const rootReducer = combineReducers({ students: studentsReducer, constraints: constraintsReducer })

export default rootReducer
