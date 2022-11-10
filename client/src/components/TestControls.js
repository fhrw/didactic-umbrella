import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchStudents } from '../actions/studentsActions'
import { fetchConstraints } from '../actions/constraintsActions'

function TestControls({ dispatch, loading, students, constraints, hasErrors }) {

  useEffect(() => {
    dispatch(fetchStudents())
    dispatch(fetchConstraints())
  }, [dispatch])

  return (
    <div>testing</div>
  )
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  constraints: state.constraints.constraints,
  loading: { students: state.students.loading, constraints: state.constraints.loading },
  hasErrors: { students: state.students.hasErrors, constraints: state.constraints.hasErrors }
})

export default connect(mapStateToProps)(TestControls)
