export const getHistory = () => ({
  type: "getHistory"
})
export const getHistorySuccess = (history) => ({
  type: "getHistorySuccess",
  payload: history
})
export const getHistoryFailure = () => ({
  type: "getHistoryFailure"
})

export function fetchHistory(teacher_id) {
  return async (dispatch) => {
    dispatch(getHistory())
    try {
      const response = await fetch(`http://localhost:3000/history/${teacher_id}`, { method: "GET" })
      const data = await response.json()

      dispatch(getHistorySuccess(data.data))
    } catch (error) {
      dispatch(getHistoryFailure())
    }
  }
}

export const updateFromTimetable = () => ({
  type: "updateFromTimetable"
})

export const updateFromTimetableSuccess = (updates) => ({
  type: "updateFromTimetableSuccess",
  payload: updates
})

export const updateFromTimetableFailure = () => ({
  type: "updateFromTimetableFailure"
})

export function fetchTimetable(teacher_id, week) {
  return async (dispatch) => {
    dispatch(updateFromTimetable())
    try {
      const response = await fetch(`http://localhost:3000/${teacher_id}/${week}`)
      const data = await response.json(data.updates)
      dispatch(updateFromTimetableSuccess())
    } catch (error) {
      dispatch(updateFromTimetableFailure())
    }
  }
}
