import { connect } from "react-redux";

import { DashContext } from "./DashContext";
import { fetchDeleteStudent } from "../actions/studentsActions";
import { useContext } from "react";
import ConstraintPicker from "./ConstraintPicker";
import LockPicker from "./Lockpicker.js";

function StudentDash({ dispatch, students, constraints, locks }) {
  const viewState = useContext(DashContext);
  if (students.loading) return <p>Loading students</p>;
  if (students.hasErrors) return <p>Error loading students</p>;
  if (!students.length) return <p>No students to display</p>;
  return (
    <div className="md:w-1/2 flex flex-col gap-y-4">
      {students.map((student) => {
        const stuCons = constraints.filter(
          (constraint) => constraint.student_id === student.id
        );
        return Student(
          student,
          stuCons,
          dispatch,
          viewState.setMode,
          viewState.setStudentTarget
        );
      })}
      {viewState.mode === "editConstraint" && (
        <ConstraintPicker student_id={viewState.studentTarget} />
      )}
      {viewState.mode === "editLock" && (
        <LockPicker student_id={viewState.studentTarget} />
      )}
    </div>
  );
}

function Student(student, constraints, dispatch, setMode, targetFunc) {
  const name = student.first_name + " " + student.last_name;

  function handleDelete() {
    dispatch(fetchDeleteStudent(student.id));
  }

  function handleEdit() {
    setMode("editConstraint");
    targetFunc(student.id);
  }

  function handleLock() {
    setMode("editLock");
    targetFunc(student.id);
  }

  const paddingDims = "px-4";
  const buttonGeneric = "w-full text-left text-white";

  return (
    <div className="flex shadow-md rounded-lg">
      <div className="w-40 flex flex-col items-start rounded-l-lg shadow-md ">
        <p
          className={`w-full font-bold text-neutral-600 bg-neutral-300 ${paddingDims} py-2 rounded-tl-lg`}
        >
          {name}
        </p>
        <button
          className={`${paddingDims} ${buttonGeneric} bg-red-400`}
          onClick={handleDelete}
        >
          delete me
        </button>
        <button
          className={`${paddingDims} ${buttonGeneric} bg-blue-400`}
          onClick={handleEdit}
        >
          edit me
        </button>
        <button
          className={`${paddingDims} ${buttonGeneric} bg-amber-400 rounded-bl-lg`}
          onClick={handleLock}
        >
          lock
        </button>
      </div>
      <div className="flex flex-wrap gap-x-1 w-full bg-neutral-200 p-4 rounded-r-lg">
        {constraints.map((c) => (
          <p className="text-neutral-600">{c.slot}</p>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  constraints: state.constraints.constraints,
  locks: state.locks.locks,
  loading: {
    students: state.students.loading,
    constraints: state.constraints.loading,
    locks: state.locks.loading,
  },
  hasErrors: {
    students: state.students.hasErrors,
    constraints: state.constraints.hasErrors,
    locks: state.locks.hasErrors,
  },
});

export default connect(mapStateToProps)(StudentDash);
