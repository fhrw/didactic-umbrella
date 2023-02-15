import { useContext } from "react";
import { connect } from "react-redux";

//component
import { DashContext } from "./DashContext";
import SlotPicker from "./SlotPicker";

// actions
import { modifyTeacher } from "../actions/teacherActions";
import { setWeek } from "../actions/uiActions.js";
import { fetchRecalc } from "../actions/historyActions";

function TeacherControls({ dispatch, teacher, slots, students, ui }) {
  const viewState = useContext(DashContext);

  function handleAdd() {
    const n = { ...teacher, term_length: teacher.term_length + 1 };
    dispatch(modifyTeacher(teacher.id, n));
    dispatch(setWeek(1));
  }

  function handleDel() {
    const n = { ...teacher, term_length: teacher.term_length - 1 };
    dispatch(modifyTeacher(teacher.id, n));
    dispatch(setWeek(-1));
  }

  function handleCalc() {
    if (!validCalc) return;
    dispatch(fetchRecalc(teacher.id, ui.week));
  }

  function handleToggleSlot() {
    if (viewState.mode === "idle") return viewState.setMode("edit_teacher");
    return viewState.setMode("idle");
  }

  const validCalc = slots.length === students.length ? true : false;
  const calcBg = validCalc ? "bg-green-400" : "bg-red-400";

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex shadow-md rounded-lg">
        <button
          className="bg-red-400 text-white px-4 py-2 sm:rounded-l-lg"
          onClick={handleDel}
        >
          Delete Week
        </button>
        <button
          className="px-4 py-2 bg-green-400 text-white"
          onClick={handleAdd}
        >
          Add Week
        </button>
        {ui.week === teacher.term_length ? (
          <button
            className={`${calcBg} text-white px-4 py-2`}
            onClick={handleCalc}
          >
            Calculate Timetable
          </button>
        ) : (
          <p>Not latest week</p>
        )}
        <button
          className="bg-blue-400 text-white px-4 py-2 sm:rounded-r-lg"
          onClick={handleToggleSlot}
        >
          Edit Slots
        </button>
      </div>
      {viewState.mode === "edit_teacher" && (
        <SlotPicker teacher_id={teacher.id} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  teacher: state.teacher.teacher,
  slots: state.slots.slots,
  students: state.students.students,
  ui: { week: state.uiData.week },
  loading: state.teacher.loading,
  hasError: state.teacher.hasErrors,
});

export default connect(mapStateToProps)(TeacherControls);
