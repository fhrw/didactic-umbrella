import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchStudents } from '../actions/studentsActions'
import { fetchConstraints } from '../actions/constraintsActions'

function TestControls({ dispatch, loading, students, constraints, hasErrors }) {

  useEffect(() => {
    dispatch(fetchStudents())
    dispatch(fetchConstraints())
  }, [dispatch])

  const renderStudents = () => {
    if (loading.students) return <p>Loading Students...</p>
    if (hasErrors.students) return <p>Unable to display students</p>
    return students.map((student) => <p>{student.first_name}</p>)
  }

  const renderConstraints = () => {
    if (loading.constraints) return <p>Loading constraints...</p>
    if (hasErrors.constraints) return <p>Unable to display constraints</p>
    return constraints.map((constraint) => <p>{constraint.slot}</p>)
  }

  return (
    <section>
      <h1>Students</h1>
      {renderStudents()}
      {renderConstraints()}
    </section>
  )
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  constraints: state.constraints.constraints,
  loading: { students: state.students.loading, constraints: state.constraints.loading },
  hasErrors: { students: state.students.hasErrors, constraints: state.constraints.hasErrors }
})

export default connect(mapStateToProps)(TestControls)
