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

export const addSlot = () => ({
  type: "addSlot"
})

export const addSlotSuccess = (slot) => ({
  type: "addSlotSuccess",
  payload: slot
})

export const addSlotFailure = () => ({
  type: "addSlotFailure"
})

export function fetchAddSlot(teacher_id, week, slot) {
  return async (dispatch) => {
    dispatch(addSlot())
    try {
      const body = { teacher_id: teacher_id, week: week, slot: slot }
      const response = await fetch(`http://localhost:3000/slot`, { method: "POST", body: JSON.stringify(body) })
      const data = await response.json()
      dispatch(addSlotSuccess(data.data))
    } catch (error) {
      dispatch(addSlotFailure())
    }
  }
}

export const deleteSlot = () => ({
  type: "deleteSlot"
})

export const deleteSlotSuccess = (slot) => ({
  type: "deleteSlotSuccess",
  payload: slot
})

export const deleteSlotFailure = () => ({
  type: "deleteSlotFailure"
})

export function fetchDeleteSlot(slot_id) {
  return async (dispatch) => {
    dispatch(deleteSlot())
    try {
      const response = await fetch(`http://localhost:3000/slot/${slot_id}`, { method: "DELETE" })
      const data = await response.json()
      dispatch(deleteSlotSuccess(data.data))
    } catch (error) {
      dispatch(deleteSlotFailure())
    }
  }
}

export const copyPrevSlots = () => ({
  type: "copyPrevSlots"
})

export const copyPrevSlotsSuccess = (slots) => ({
  type: "copyPrevSlotsSuccess",
  payload: slots
})

export const copyPrevSlotsFailure = () => ({
  type: "copyPrevSlotsFailure"
})

export function fetchPrevSlots(teacher_id, week) {
  return async (dispatch) => {
    dispatch(copyPrevSlots())
    try {
      const response = await fetch(`http://localhost:3000/copyprev/${teacher_id}/${week}`)
      const data = await response.json()
      dispatch(copyPrevSlotsSuccess(data.data))
    } catch (error) {
      dispatch(copyPrevSlotsFailure())
    }
  }
}
