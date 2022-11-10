import * as action from '../actions/uiActions'

export const initialState = {
  week: 0
}

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case "increment":
      return { week: state.week + 1 }
    case "decrement":
      return { week: state.week - 1 }
    default:
      return state
  }
}
