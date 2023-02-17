import { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
//actions
import { fetchStudents } from "../actions/studentsActions";
import { fetchTeacher } from "../actions/teacherActions";
import { fetchConstraints } from "../actions/constraintsActions";
import { fetchHistory } from "../actions/historyActions";
import { fetchSlots } from "../actions/slotActions";
import { fetchLocks } from "../actions/lockActions";
//components
import WeekNav from "./WeekNav";
import TeacherControls from "./TeacherControls";
import { ConnectedTimetable, ConnectedNewTimetable } from "./Timetable";
import StudentDash from "./StudentDash";
import ConstraintPicker from "./ConstraintPicker";
import TeacherPicker from "./TeacherPicker";
import AddStudent from "./AddStudent";
import { DashProvider, DashContext } from "./DashContext";

function Dashboard({ dispatch, ui, teacher }) {
  // get students, teacher and histo related to them
  useEffect(() => {
    dispatch(fetchStudents("3ee26224-3ce8-447d-8035-eeaee9b35e8e"));
    dispatch(fetchTeacher("3ee26224-3ce8-447d-8035-eeaee9b35e8e"));
    dispatch(fetchHistory("3ee26224-3ce8-447d-8035-eeaee9b35e8e"));
  }, [dispatch]);

  // get relevant constraints and slots and locks
  useEffect(() => {
    dispatch(fetchConstraints(ui.week));
    dispatch(fetchSlots("3ee26224-3ce8-447d-8035-eeaee9b35e8e", ui.week));
    dispatch(fetchLocks("3ee26224-3ce8-447d-8035-eeaee9b35e8e", ui.week));
  }, [dispatch, ui.week]);

  return (
    <DashProvider>
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center py-8">
        <div className="flex flex-col items-center gap-y-4 z-20">
          <TeacherControls />
          <ConnectedNewTimetable />
          <StudentDash />
          <AddStudent />
        </div>
        <WeekNav />
      </div>
    </DashProvider>
  );
}

const mapStateToProps = (state) => ({
  teacher: state.teacher.teacher,
  loading: {
    teacher: state.teacher.loading,
  },
  hasErrors: {
    teacher: state.teacher.hasErrors,
  },
  ui: { week: state.uiData.week },
});

export default connect(mapStateToProps)(Dashboard);
