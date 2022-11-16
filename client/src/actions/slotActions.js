export const getSlots = () => ({
  type: "getSlots"
})

export const getSlotsSuccess = (slots) => ({
  type: "getSlotsSuccess",
  payload: slots
})

export const getSlotsFailure = () => ({
  type: "getSlotsFailure"
})

// combined
export function fetchSlots(teacher, week) {
  return async (dispatch) => {
    dispatch(getSlots())
    try {
      const response = await fetch(`http://localhost:3000/slots/${teacher}/${week}`)
      const data = await response.json()
      dispatch(getSlotsSuccess(data.data))
    } catch {
      dispatch(getSlotsFailure())
    }
  }
}
