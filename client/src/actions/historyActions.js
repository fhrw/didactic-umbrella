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

export const recalc = () => ({
  type: "recalc"
})

export const recalcSuccess = (history) => ({
  type: "recalcSuccess",
  payload: history
})

export const recalcFailure = () => ({
  type: "recalcFailure"
})

export function fetchRecalc(teacher_id, week) {
  return async (dispatch) => {
    dispatch(recalc())
    try {
      const response = await fetch(`http://localhost:3000/timetable/${teacher_id}/${week}`)
      const data = await response.json()
      dispatch(recalcSuccess(data.data))
    } catch (error) {
      dispatch(recalcFailure())
    }
  }
}
