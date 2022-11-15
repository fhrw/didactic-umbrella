import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchStudents } from '../actions/studentsActions'
import { fetchTeacher, modifyTeacher } from '../actions/teacherActions'
import { fetchConstraints } from '../actions/constraintsActions'
import { decrementWeek, incrementWeek, setWeek } from '../actions/uiActions'
import { fetchHistory } from '../actions/historyActions'

function TestControls({ dispatch, loading, students, constraints, teacher, ui, hasErrors }) {

  useEffect(() => {
    dispatch(fetchStudents())
    dispatch(fetchTeacher(1))
    dispatch(fetchHistory(1))
  }, [dispatch])


  function handleInc() {
    dispatch(setWeek(1))
    // dispatch(fetchConstraints(ui.week + 1))
  }

  function handleDec() {
    dispatch(setWeek(-1))
    // dispatch(fetchConstraints(ui.week - 1))
  }

  useEffect(() => {
    dispatch(fetchConstraints(ui.week))
  }, [dispatch, ui.week])

  function increaseLength() {
    const n = { ...teacher, term_length: teacher.term_length + 1 }
    dispatch(modifyTeacher(1, n))
  }

  function decreaseLength() {
    const n = { ...teacher, term_length: teacher.term_length - 1 }
    dispatch(modifyTeacher(1, n))
  }

  return (
    <div>
      <button onClick={handleInc} >increment</button>
      <button onClick={handleDec} >decrement</button>
      <button onClick={increaseLength}>increase</button>
      <button onClick={decreaseLength}>decrease</button>
      <p>{teacher.term_length}</p>
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
