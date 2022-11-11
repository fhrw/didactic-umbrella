export const getTeacher = () => ({
  type: "getTeacher"
})

export const getTeacherSuccess = (teacher) => ({
  type: "getTeacherSuccess",
  payload: teacher
})

export const getTeacherFailure = () => ({
  type: "getTeacherFailure"
})

export function fetchTeacher(teacherId) {
  return async (dispatch) => {
    dispatch(getTeacher())
    try {
      const response = await fetch(`http://localhost:3000/teacher/${teacherId}`, { method: "GET" })
      const data = await response.json()
      dispatch(getTeacherSuccess(data.data))
    } catch (error) {
      dispatch(getTeacherFailure())
    }
  }
}
