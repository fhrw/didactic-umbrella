import { connect } from "react-redux";

import { setWeek } from "../actions/uiActions";

function WeekNav({ dispatch, ui, teacher, loading, hasErrors }) {
  function handleInc() {
    if (ui.week < teacher.term_length) {
      dispatch(setWeek(1));
    }
  }
  function handleDec() {
    if (ui.week > 1) {
      dispatch(setWeek(-1));
    }
  }

  const style =
    "px-2 py-2 bg-neutral-200 hover:bg-slate-200 active:bg-neutral-300 rounded-lg text-neutral-600 shadow-md";

  return (
    <div className="fixed top-0 w-[50rem] h-screen flex items-center px-6 pointer-events-none">
      <div className="w-full flex justify-between pointer-events-auto">
        <button className={`${style}`} onClick={handleDec}>
          prev
        </button>
        <button className={`${style}`} onClick={handleInc}>
          next
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  teacher: state.teacher.teacher,
  loading: state.teacher.loading,
  hasError: state.teacher.hasErrors,
  ui: { week: state.uiData.week },
});

export default connect(mapStateToProps)(WeekNav);
