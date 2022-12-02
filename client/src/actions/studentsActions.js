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

export const addStudent = () => ({
  type: "addStudent"
})

export const addStudentSuccess = (student) => ({
  type: "addStudentSuccess",
  payload: student
})

export const addStudentFailure = () => ({
  type: "addStudentFailure"
})

export function fetchAddStudent(student) {
  return async (dispatch) => {
    dispatch(addStudent())
    try {
      const body = { teacher_id: student.teacher_id, first_name: student.firstName, last_name: student.lastName, school: student.school }
      const response = await fetch('http://localhost:3000/students', { method: 'POST', body: JSON.stringify(body) })
      const data = await response.json()
      dispatch(addStudentSuccess(data.data))
    } catch (error) {
      dispatch(addStudentFailure())
    }
  }
}

export const deleteStudent = () => ({
  type: "deleteStudent"
})

export const deleteStudentSuccess = (student) => ({
  type: "deleteStudentSuccess",
  payload: student
})

export const deleteStudentFailure = () => ({
  type: "deleteStudentFailure"
})
