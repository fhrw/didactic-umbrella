import { useEffect, useState, useContext } from "react"
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
import { ConnectedTimetable, ConnectedNewTimetable } from "./Timetable"
import StudentDash from "./StudentDash"
import ConstraintPicker from "./ConstraintPicker"
import TeacherPicker from "./TeacherPicker"
import AddStudent from "./AddStudent"
import { DashProvider, DashContext } from "./DashContext"
import { fetchLocks } from "../actions/lockActions"

function Dashboard({ dispatch, ui, teacher }) {
  // get students, teacher and histo related to them
  useEffect(() => {
    dispatch(fetchStudents("3ee26224-3ce8-447d-8035-eeaee9b35e8e"))
    dispatch(fetchTeacher("3ee26224-3ce8-447d-8035-eeaee9b35e8e"))
    dispatch(fetchHistory("3ee26224-3ce8-447d-8035-eeaee9b35e8e"))
  }, [dispatch])

  // get relevant constraints and slots
  useEffect(() => {
    dispatch(fetchConstraints(ui.week))
    dispatch(fetchSlots("3ee26224-3ce8-447d-8035-eeaee9b35e8e", ui.week))
    dispatch(fetchLocks("3ee26224-3ce8-447d-8035-eeaee9b35e8e", ui.week))
  }, [dispatch, ui.week])

  return (
    <DashProvider>
      <div className="h-screen">
        <div className="flex flex-col items-center gap-y-4 z-20">
          <TeacherControls />
          <ConnectedNewTimetable />
          <StudentDash />
          <AddStudent />
        </div>
        <WeekNav />
      </div>
    </DashProvider>
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
