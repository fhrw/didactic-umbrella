import * as action from '../actions/uiActions'

export const initialState = {
  week: 0
}

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case "setWeek":
      return { week: state.week + action.payload }
    default:
      return state
  }
}
