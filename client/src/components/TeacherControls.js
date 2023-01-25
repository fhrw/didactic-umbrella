import { useContext } from "react"
import { connect } from "react-redux"

import { DashContext } from './DashContext'
import SlotPicker from "./SlotPicker"

// actions
import { modifyTeacher } from '../actions/teacherActions'
import { setWeek } from '../actions/uiActions.js'
import { fetchRecalc } from '../actions/historyActions'

function TeacherControls({ dispatch, teacher, slots, students, ui }) {
  const viewState = useContext(DashContext)

  function handleAdd() {
    const n = { ...teacher, term_length: teacher.term_length + 1 }
    dispatch(modifyTeacher(teacher.id, n))
    dispatch(setWeek(1))
  }

  function handleDel() {
    const n = { ...teacher, term_length: teacher.term_length - 1 }
    dispatch(modifyTeacher(teacher.teacher_id, n))
    dispatch(setWeek(-1))
  }

  function handleCalc() {
    if (slots.length != students.length) return
    dispatch(fetchRecalc(teacher.id, ui.week))
  }

  function handleToggleSlot() {
    if (viewState.mode === 'idle') return viewState.setMode('edit_teacher')
    return viewState.setMode('idle')
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2">
        <button onClick={handleDel}>Delete Week</button>
        <button onClick={handleAdd}>Add Week</button>
        {
          ui.week === teacher.term_length ?
            <button onClick={handleCalc}>Calculate Timetable</button>
            :
            <p>Not latest week</p>
        }
        <button onClick={handleToggleSlot}>Edit Slots</button>
      </div>
      {viewState.mode === 'edit_teacher' && <SlotPicker teacher_id={teacher.id} />}
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
