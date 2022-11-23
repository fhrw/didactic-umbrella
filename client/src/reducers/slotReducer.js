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
      return { slots: action.payload, loading: false, hasErrors: false }
    case 'addSlotFailure':
      return { ...state, loading: false, hasErrors: true }
    default:
      return state
  }
}
