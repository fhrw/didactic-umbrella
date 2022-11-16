import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchStudents } from '../actions/studentsActions'
import { fetchTeacher, modifyTeacher } from '../actions/teacherActions'
import { fetchConstraints } from '../actions/constraintsActions'
import { decrementWeek, incrementWeek, setWeek } from '../actions/uiActions'
import { fetchHistory } from '../actions/historyActions'
import { fetchSlots } from '../actions/slotActions'

function TestControls({ dispatch, loading, students, history, constraints, teacher, ui, hasErrors }) {

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
    dispatch(fetchSlots(1, ui.week))
  }, [dispatch, ui.week])

  function increaseLength() {
    const n = { ...teacher, term_length: teacher.term_length + 1 }
    dispatch(modifyTeacher(1, n))
  }

  function decreaseLength() {
    const n = { ...teacher, term_length: teacher.term_length - 1 }
    dispatch(modifyTeacher(1, n))
  }

  function handleCalc() {
    fetch(`http://localhost:3000/timetable/${teacher.teacher_id}/${ui.week}`)
    dispatch(fetchHistory(teacher.teacher_id))
  }

  const viewTimeTable = history.filter((item) => item.week === ui.week)

  return (
    <div>
      <button onClick={handleInc} >increment</button>
      <button onClick={handleDec} >decrement</button>
      <button onClick={increaseLength}>increase</button>
      <button onClick={decreaseLength}>decrease</button>
      <p>curr view: {ui.week}</p>
      <p>Term Length: {teacher.term_length}</p>
      <p>timetable test</p>
      <button onClick={handleCalc}>calculate timetable for this week</button>
      <div>
        {viewTimeTable.map((item) => <p key={item.history_id}>{item.slot}: id_{item.student_id}</p>)}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  teacher: state.teacher.teacher,
  slots: state.slots.slots,
  constraints: state.constraints.constraints,
  history: state.history.history,
  loading: { students: state.students.loading, constraints: state.constraints.loading, teacher: state.teacher.loading, slots: state.slots, loading: state.slots.loading, history: state.history.loading },
  hasErrors: { students: state.students.hasErrors, constraints: state.constraints.hasErrors },
  ui: { week: state.uiData.week }
})

export default connect(mapStateToProps)(TestControls)
