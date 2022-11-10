import * as actions from '../actions/historyActions'

export const initialState = {
  history: [],
  loading: false,
  hasErrors: false
}

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case "getHistory":
      return { ...state, loading: true }
    case "getHistorySuccess":
      return { history: action.payload, loading: false, hasErrors: false }
    case "getHistoryFailure":
      return { ...state, loading: false, hasErrors: true }
    default:
      return state
  }
}
