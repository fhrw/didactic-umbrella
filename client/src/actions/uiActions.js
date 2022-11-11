export const incrementWeek = () => ({
  type: "increment"
})

export const decrementWeek = () => ({
  type: "decrement"
})

export const setWeek = () => ({

})

export const somethingElse = (increment) => ({
  type: "setWeek",
  payload: increment
})

