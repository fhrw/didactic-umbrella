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

export function fetchHistory() {
  return async (dispatch) => {
    dispatch(getHistory())
    try {
      const response = await fetch("http://localhost:3000/history", { method: "GET" })
      const data = await response.json()

      dispatch(getHistorySuccess(data.data))
    } catch (error) {
      dispatch(getHistoryFailure())
    }
  }
}
