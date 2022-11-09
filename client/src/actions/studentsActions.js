export const GET_STUDENTS = 'GET_STUDENTS'
export const GET_STUDENTS_SUCCESS = 'GET_STUDENTS_SUCCESS'
export const GET_STUDENTS_FAILURE = 'GET_STUDENTS_FAILURE'

// create redux action creators that return an action
export const getStudents = () => ({
  type: GET_STUDENTS
})

export const getStudentsSuccess = (students) => ({
  type: GET_STUDENTS_SUCCESS,
  payload: students
})

export const getStudentsFailure = () => ({
  type: GET_STUDENTS_FAILURE,
})

// comine them all in an asynchronous thunk

export function fetchStudents() {
  return async (dispatch) => {
    dispatch(getStudents())

    try {
      const response = await fetch('http://localhost:3000/students', { method: "GET" })
      const data = await response.json()

      dispatch(getStudentsSuccess(data.data))
    } catch (error) {
      dispatch(getStudentsFailure())
    }
  }
}
