export const GET_CONSTRAINTS = 'GET_CONSTRAINTS';
export const GET_CONSTRAINTS_SUCCESS = 'GET_CONSTRAINTS_SUCCESS'
export const GET_CONSTRAINTS_FAILURE = 'GET_CONSTRAINTS_FAILURE'
export const ADD_CONSTRAINT = "ADD_CONSTRAINTS"
export const ADD_CONSTRAINT_SUCCESS = "ADD_CONSTRAINTS_SUCCESS"
export const ADD_CONSTRAINT_FAILURE = "ADD_CONSTRAINTS_FAILURE"
export const DELETE_CONSTRAINT = "DELETE_CONSTRAINT"
export const DELETE_CONSTRAINT_SUCCESS = "DELETE_CONSTRAINT_SUCCESS"
export const DELETE_CONSTRAINT_FAILURE = "DELETE_CONSTRAINT_FAILURE"

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

export const addConstraint = () => ({
  type: ADD_CONSTRAINT
})

export const addConstraintSuccess = (constraint) => ({
  type: ADD_CONSTRAINT_SUCCESS,
  payload: constraint
})

export const addConstraintFailure = () => ({
  type: ADD_CONSTRAINT_FAILURE,
})

export function fetchAddConstraint(student_id, week, slot) {
  return async (dispatch) => {
    dispatch(addConstraint())
    try {
      const body = { student_id: student_id, week: week, slot: slot }
      const response = await fetch(`http://localhost:3000/constraints`, { method: 'POST', body: JSON.stringify(body) })
      const data = await response.json()
      dispatch(addConstraintSuccess(data.data))
    } catch (error) {
      dispatch(addConstraintFailure())
    }
  }
}

export const deleteConstraint = () => ({
  type: DELETE_CONSTRAINT
})

export const deleteConstraintSuccess = (constraints) => ({
  type: DELETE_CONSTRAINT_SUCCESS,
  payload: constraints
})

export const deleteConstraintFailure = () => ({
  type: DELETE_CONSTRAINT_FAILURE
})

export function fetchDelConstraint(constraint_id) {
  return async (dispatch) => {
    dispatch(deleteConstraint())
    try {
      const response = await fetch(`http://localhost:3000/constraints/${constraint_id}`, { method: "DELETE" })
      const data = await response.json()
      dispatch(deleteConstraintSuccess(data.data))
    } catch (error) {
      dispatch(deleteConstraintFailure())
    }
  }
}

