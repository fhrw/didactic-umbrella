export const initialState = {
  slots: [],
  loading: false,
  hasErrors: false
}

export default function slotReducer(state = initialState, action) {
  switch (action.type) {
    case "getSlots":
      return { ...state, loading: true }
    case "getSlotsSuccess":
      return { slots: action.payload, loading: false, hasErrors: false }
    case 'getSlotsFailure':
      return { ...state, loading: false, hasErrors: false }
    case 'addSlot':
      return { ...state, loading: true, hasErrors: false }
    case 'addSlotSuccess':
      return { slots: [...state.slots, action.payload], loading: false, hasErrors: false }
    case 'addSlotFailure':
      return { ...state, loading: false, hasErrors: true }
    case 'deleteSlot':
      return { ...state, loading: true, hasErrors: false }
    case 'deleteSlotSuccess':
      const filtered = state.slots.filter((slot) => slot.slot_id != action.payload.slot_id)
      return { slots: filtered, loading: false, hasErrors: false }
    case 'deleteSlotFailure':
      return { ...state, loading: false, hasErrors: true }
    case 'copyPrevSlots':
      return { ...state, loading: true }
    case 'copyPrevSlotsSuccess':
      return { slots: action.payload, loading: false, hasErrors: false }
    case 'copyPrevSlotsFailure':
      return { ...state, loading: false, hasErrors: true }
    default:
      return state
  }
}
