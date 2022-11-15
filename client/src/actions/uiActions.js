export const incrementWeek = () => ({
  type: "increment"
})

export const decrementWeek = () => ({
  type: "decrement"
})

export const setWeek = (increment) => ({
  type: "setWeek",
  payload: increment
})

