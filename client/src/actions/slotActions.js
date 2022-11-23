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
      const response = await fetch(`http://localhost:3000/slots`, { method: "POST", body: JSON.stringify(body) })
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
  return async (dispatch, getState) => {
    dispatch(deleteSlot())
    try {
      const response = await fetch(`http://localhost:3000/slots/${slot_id}`, { method: "DELETE" })
      const data = await response.json()
      const { slots } = getState().slots.slots
      const filtered = slots.filter((slot) => slot.slot_id !== data.data.slot_id)
      dispatch(deleteSlotSuccess(filtered))
    } catch (error) {
      dispatch(deleteSlotFailure())
    }
  }
}
