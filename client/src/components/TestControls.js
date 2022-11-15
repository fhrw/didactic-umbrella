import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchStudents } from '../actions/studentsActions'
import { fetchTeacher } from '../actions/teacherActions'
import { fetchConstraints } from '../actions/constraintsActions'
import { decrementWeek, incrementWeek } from '../actions/uiActions'
import { fetchHistory } from '../actions/historyActions'

function TestControls({ dispatch, loading, students, constraints, teacher, ui, hasErrors }) {

  useEffect(() => {
    dispatch(fetchStudents())
    dispatch(fetchTeacher(1))
    dispatch(fetchHistory(1))
    dispatch(fetchConstraints(ui.week))
  }, [dispatch])


  function handleInc() {
    dispatch(incrementWeek())
    // dispatch(fetchConstraints(ui.week + 1))
  }

  function handleDec() {
    dispatch(decrementWeek())
    // dispatch(fetchConstraints(ui.week - 1))
  }

  useEffect(() => {
    dispatch(fetchConstraints(ui.week))
  }, [dispatch, ui.week])

  return (
    <div>
      <button onClick={handleInc} >increment</button>
      <button onClick={handleDec} >decrement</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  teacher: state.teacher.teacher,
  constraints: state.constraints.constraints,
  loading: { students: state.students.loading, constraints: state.constraints.loading },
  hasErrors: { students: state.students.hasErrors, constraints: state.constraints.hasErrors },
  ui: { week: state.uiData.week }
})

export default connect(mapStateToProps)(TestControls)
