import { useEffect } from "react"
import { connect } from "react-redux"
//actions
import { fetchStudents } from '../actions/studentsActions'
import { fetchTeacher, modifyTeacher } from '../actions/teacherActions'
import { addConstraint, fetchAddConstraint, fetchConstraints, fetchDelConstraint } from '../actions/constraintsActions'
import { decrementWeek, incrementWeek, setWeek } from '../actions/uiActions'
import { fetchHistory, fetchRecalc } from '../actions/historyActions'
import { fetchSlots, fetchAddSlot, fetchDeleteSlot } from '../actions/slotActions'
//components
import WeekNav from "./WeekNav"
import TeacherControls from "./TeacherControls"

function Dashboard({ dispatch, ui, teacher }) {
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

  return <div>
    <WeekNav />
    <TeacherControls />
  </div>
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
