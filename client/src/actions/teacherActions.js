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
    dispatch(getTeacher(teacherId))
    try {
      const response = await fetch(`http://localhost:3000/teacher/${teacherId}`, { method: "GET" })
      const data = await response.json()
      dispatch(getTeacherSuccess(data.data))
    } catch (error) {
      dispatch(getTeacherFailure())
    }
  }
}

export const updateTeacher = () => ({ type: "updateTeacher" })
export const updateTeacherSuccess = (teacher) => ({ type: "updateTeacherSuccess", payload: teacher })
export const updateTeacherFailure = () => ({ type: "updateTeacherFailure" })

export function modifyTeacher(teacher_id, body) {
  return async (dispatch) => {
    dispatch(updateTeacher(teacher_id))
    try {
      const response = await fetch(`http://localhost:3000/teacher/${teacher_id}`, { method: "PATCH", body: JSON.stringify(body) })
      const data = await response.json()
      dispatch(updateTeacherSuccess(data.data))
    } catch (error) {
      dispatch(updateTeacherFailure())
    }
  }
}
