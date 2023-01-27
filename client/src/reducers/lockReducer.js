export const initialState = {
  locks: [],
  loading: false,
  hasErrors: false
}

export default function lockReducer(state = initialState, action) {
  switch (action.type) {
    case "getLocks":
      return { ...state, loading: true }
    case "getLocksSuccess":
      return { locks: action.payload, loading: false, hasErrors: false }
    case "getLocksFailure":
      return { ...state, loading: false, hasErrors: false }
  }
}
