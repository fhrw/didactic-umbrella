import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchStudents } from '../actions/studentsActions'
import { fetchTeacher, modifyTeacher } from '../actions/teacherActions'
import { addConstraint, fetchAddConstraint, fetchConstraints, fetchDelConstraint } from '../actions/constraintsActions'
import { decrementWeek, incrementWeek, setWeek } from '../actions/uiActions'
import { fetchHistory, fetchRecalc } from '../actions/historyActions'
import { fetchSlots, fetchAddSlot, fetchDeleteSlot } from '../actions/slotActions'

function TestControls({ dispatch, loading, students, slots, history, constraints, teacher, ui, hasErrors }) {

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
    dispatch(modifyTeacher(teacher.teacher_id, n))
  }

  function decreaseLength() {
    const n = { ...teacher, term_length: teacher.term_length - 1 }
    dispatch(modifyTeacher(teacher.teacher_id, n))
  }

  function handleCalc() {
    dispatch(fetchRecalc(teacher.teacher_id, ui.week))
  }

  function renderTimetable() {
    if (history.loading) return <p>Loading...</p>
    if (history.hasErrors) return <p>Unable to display</p>
    const filteredHist = history.filter((item) => item.week === ui.week)
    return filteredHist.map((item) => <p>{item.slot}: student {item.student_id}</p>)
  }

  function handleToggleOff(constraint_id) {
    dispatch(fetchDelConstraint(constraint_id))
  }

  function handleToggleOn(student_id, week, slot) {
    dispatch(fetchAddConstraint(student_id, week, slot))
  }

  function renderSlots(student_id) {
    if (slots.loading || constraints.loading) return <p>Loading...</p>
    if (slots.hasErrors || constraints.hasErrors) return <p>Unable to display</p>
    // if (!slots.length) return
    const constrainedSlots = constraints.filter((constraint) => constraint.student_id === student_id)
    return slots?.map?.((slot) => {
      const matches = constrainedSlots.filter((constraint) => constraint.slot === slot.slot)
      if (matches.length) {
        const target = matches[0].constraint_id
        return <button onClick={() => handleToggleOff(target)}>constrained: {slot.slot}</button>
      }
      return <button onClick={() => handleToggleOn(student_id, ui.week, slot.slot)}>{slot.slot}</button>
    })
  }

  function teacherToggleOn(teacher_id, week, slot) {
    dispatch(fetchAddSlot(teacher_id, week, slot))
  }

  function teacherToggleOff(slot_id) {
    dispatch(fetchDeleteSlot(slot_id))
  }

  function renderTeacherChoice() {
    const slotOptions = ["monday 1", "monday 2", "monday 3", "monday 4", "monday 5", "monday 6"]
    if (slots.loading) return <p>Loading..</p>
    if (slots.hasErrors) return <p>Unable to display...</p>
    return slotOptions.map((slot) => {
      const selected = slots.findIndex((s) => s.slot === slot)
      if (selected != -1) return <button onClick={() => teacherToggleOff(slots[selected].slot_id)}>selected: {slots[selected].slot}</button>
      return <button onClick={() => teacherToggleOn(teacher.teacher_id, ui.week, slot)}>{slot}</button>
    })
  }



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
        {renderTimetable()}
      </div>
      <div>
        <p>constrained slots (student 1):</p>
        {renderSlots(1)}
      </div>
      <div>
        <p>constrained slots (student 2):</p>
        {renderSlots(2)}
      </div>
      <div>
        <p>teacher slots</p>
        {renderTeacherChoice(teacher.teacher_id)}
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
