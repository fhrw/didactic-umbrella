import * as actions from '../actions/studentsActions'

export const initialState = {
  students: [],
  loading: false,
  hasErrors: false,
}

export default function studentsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_STUDENTS:
      return { ...state, loading: true }
    case actions.GET_STUDENTS_SUCCESS:
      return { students: action.payload, loading: false, hasErrors: false }
    case actions.GET_STUDENTS_FAILURE:
      return { ...state, loading: false, hasErrors: true }
    case "addStudent":
      return { ...state, loading: true }
    case "addStudentSuccess":
      return { students: [...state.students, action.payload], loading: false, hasErrors: false }
    case "addStudentFailure":
      return { ...state, loading: false, hasErrors: true }
    default:
      return state
  }
}
