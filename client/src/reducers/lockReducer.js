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
    case "addLock":
      return { ...state, loading: true, hasErrors: false }
    case "addLockSuccess":
      return { locks: [...state.locks, action.payload], loading: false, hasErrors: false }
    case "addLockFailure":
      return { ...state, loading: false, hasErrors: false }
    case "deleteLock":
      return { ...state, loading: true }
    case "deleteLockSuccess":
      const filtered = state.locks.filter(lock => lock.id != action.payload.id)
      return { locks: filtered, loading: false, hasErrors: false }
    case "deleteLockFailure":
      return { ...state, loading: false, hasErrors: true }
    default:
      return state
  }
}
