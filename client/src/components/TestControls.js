import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchStudents } from '../actions/studentsActions'
import { fetchConstraints } from '../actions/constraintsActions'
import { decrementWeek, incrementWeek } from '../actions/uiActions'

function TestControls({ dispatch, loading, students, constraints, ui, hasErrors }) {

  useEffect(() => {
    dispatch(fetchStudents())
    dispatch(fetchConstraints(ui.week))
  }, [dispatch])

  function handleInc() {
    dispatch(incrementWeek())
    dispatch(fetchConstraints(ui.week + 1))
  }

  function handleDec() {
    dispatch(decrementWeek())
    dispatch(fetchConstraints(ui.week - 1))
  }

  return (
    <div>
      <button onClick={handleInc} >increment</button>
      <button onClick={handleDec} >decrement</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  constraints: state.constraints.constraints,
  loading: { students: state.students.loading, constraints: state.constraints.loading },
  hasErrors: { students: state.students.hasErrors, constraints: state.constraints.hasErrors },
  ui: { week: state.uiData.week }
})

export default connect(mapStateToProps)(TestControls)
