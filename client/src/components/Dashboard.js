import { useEffect, useState } from "react"
import { connect } from "react-redux"
//actions
import { fetchStudents } from '../actions/studentsActions'
import { fetchTeacher } from '../actions/teacherActions'
import { fetchConstraints } from '../actions/constraintsActions'
import { fetchHistory } from '../actions/historyActions'
import { fetchSlots } from '../actions/slotActions'
//components
import WeekNav from "./WeekNav"
import TeacherControls from "./TeacherControls"
import Timetable from "./Timetable"
import StudentDash from "./StudentDash"
import ConstraintPicker from "./ConstraintPicker"
import TeacherPicker from "./TeacherPicker"
import AddStudent from "./AddStudent"
import DashContext from "./DashContext"

function Dashboard({ dispatch, ui, teacher }) {
  const [uiState, setUiState] = useState("idle")
  // get students, teacher and histo related to them
  useEffect(() => {
    dispatch(fetchStudents())
    dispatch(fetchTeacher(1))
    dispatch(fetchHistory(1))
  }, [dispatch])

  // get relevant constraints and slots
  useEffect(() => {
    dispatch(fetchConstraints(ui.week))
    dispatch(fetchSlots(teacher.teacher_id, ui.week))
  }, [dispatch, ui.week])

  return (
    <DashContext.Provider value={{ uiState, setUiState }}>
      <div>
        <WeekNav />
        <TeacherControls />
        <Timetable />
        <StudentDash />
      </div>
    </DashContext.Provider >
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

export default connect(mapStateToProps)(Dashboard) 
