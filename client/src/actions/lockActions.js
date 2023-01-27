export const getLocks = () => ({
  type: "getLocks"
})

export const getLocksSuccess = (locks) => ({
  type: "getLocksSuccess",
  payload: locks
})

export const getLocksFailure = () => ({
  type: "getLocksFailure"
})

export function fetchLocks(teacher_id, week) {
  return async (dispatch) => {
    dispatch(getLocks())
    try {
      const body = { teacher_id: teacher_id, week: week }
      const resp = await fetch('http://localhost:3000/get-locks', {
        method: "POST",
        body: JSON.stringify(body)
      })
      const data = await resp.json()
      dispatch(getLocksSuccess(data.data))
    } catch (error) {
      dispatch(getLocksFailure())
    }
  }
}
