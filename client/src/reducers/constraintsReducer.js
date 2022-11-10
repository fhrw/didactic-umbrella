import * as actions from '../actions/constraintsActions.js'

export const initialState = {
  constraints: [],
  loading: false,
  hasErrors: false
}

export default function constraintsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_CONSTRAINTS:
      return { ...state, loading: true }
    case actions.GET_CONSTRAINTS_SUCCESS:
      return { constraints: action.payload, loading: false, hasErrors: false }
    case actions.GET_CONSTRAINTS_FAILURE:
      return { ...state, loading: false, hasErrors: true }
    default:
      return state
  }
}
