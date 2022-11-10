export const GET_CONSTRAINTS = 'GET_CONSTRAINTS';
export const GET_CONSTRAINTS_SUCCESS = 'GET_CONSTRAINTS_SUCCESS'
export const GET_CONSTRAINTS_FAILURE = 'GET_CONSTRAINTS_FAILURE'

// create redux action creators that return an action
export const getConstraints = () => ({
  type: GET_CONSTRAINTS
})

export const getConstraintsSuccess = (constraints) => ({
  type: GET_CONSTRAINTS_SUCCESS,
  payload: constraints
})

export const getConstraintsFailure = () => ({
  type: GET_CONSTRAINTS_FAILURE,
})

// comine them all in an asynchronous thunk

export function fetchConstraints(week) {
  return async (dispatch) => {
    dispatch(getConstraints())

    try {
      const response = await fetch(`http://localhost:3000/constraints/${week}`, { method: "GET" })
      const data = await response.json()

      dispatch(getConstraintsSuccess(data.data))
    } catch (error) {
      dispatch(getConstraintsFailure())
    }
  }
}
