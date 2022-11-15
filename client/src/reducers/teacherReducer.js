export const initialState = {
  teacher: {},
  loading: false,
  hasErrors: false
}

export default function teacherReducer(state = initialState, action) {
  switch (action.type) {
    case "getTeacher":
      return { ...state, loading: true }
    case "getTeacherSuccess":
      return { teacher: action.payload, loading: false, hasErrors: false }
    case "getTeacherFailure":
      return { ...state, loading: false, hasErrors: true }
    case "updateTeacher":
      return { ...state, loading: true }
    case "updateTeacherSuccess":
      return { teacher: action.payload, loading: false, hasErrors: false }
    case "updateTeacherFailure":
      return { ...state, loading: false, hasErrors: true }
    default:
      return state
  }
}
