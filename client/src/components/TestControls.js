import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchStudents } from '../actions/studentsActions'
import { fetchConstraints } from '../actions/constraintsActions'
import { incrementWeek } from '../actions/uiActions'

function TestControls({ dispatch, loading, students, constraints, hasErrors }) {

  useEffect(() => {
    dispatch(fetchStudents())
    dispatch(fetchConstraints(1))
  }, [dispatch])

  function handle() {
    dispatch(incrementWeek())
  }

  return (
    <div><button onClick={handle} /></div>
  )
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  constraints: state.constraints.constraints,
  loading: { students: state.students.loading, constraints: state.constraints.loading },
  hasErrors: { students: state.students.hasErrors, constraints: state.constraints.hasErrors }
})

export default connect(mapStateToProps)(TestControls)
