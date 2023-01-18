import { connect } from "react-redux"

import { DashContext } from './DashContext'

// actions
import { modifyTeacher } from '../actions/teacherActions'
import { fetchRecalc } from '../actions/historyActions'
import SlotPicker from "./SlotPicker"
import { useContext } from "react"

function TeacherControls({ dispatch, teacher, slots, students, ui }) {
  const viewState = useContext(DashContext)

  function handleAdd() {
    const n = { ...teacher, term_length: teacher.term_length + 1 }
    dispatch(modifyTeacher(teacher.teacher_id, n))
  }

  function handleDel() {
    const n = { ...teacher, term_length: teacher.term_length - 1 }
    dispatch(modifyTeacher(teacher.teacher_id, n))
  }

  function handleCalc() {
    if (slots.length != students.length) return
    dispatch(fetchRecalc(teacher.teacher_id, ui.week))
  }

  function handleToggleSlot() {
    if (viewState.mode === 'idle') return viewState.setMode('edit_teacher')
    return viewState.setMode('idle')
  }

  return (
    <div>
      <button onClick={handleDel}>Delete Week</button>
      <button onClick={handleAdd}>Add Week</button>
      <button onClick={handleCalc}>Calculate Timetable</button>
      <button onClick={handleToggleSlot}>Edit Slots</button>
      {viewState.mode === 'edit_teacher' && <SlotPicker teacher_id={teacher.teacher_id} />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  teacher: state.teacher.teacher,
  slots: state.slots.slots,
  students: state.students.students,
  ui: { week: state.uiData.week },
  loading: state.teacher.loading,
  hasError: state.teacher.hasErrors
})

export default connect(mapStateToProps)(TeacherControls)
