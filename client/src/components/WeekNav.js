import { connect } from "react-redux"

import { setWeek } from '../actions/uiActions'

function WeekNav({ dispatch, ui, teacher, loading, hasErrors }) {
  function handleInc() {
    if (ui.week < teacher.term_length) {
      dispatch(setWeek(1))
    }
  }
  function handleDec() {
    if (ui.week > 1) {
      dispatch(setWeek(-1))
    }
  }
  return (
    <div className="fixed top-0 w-full h-screen flex items-center px-6 pointer-events-none">
      <div className="w-full flex justify-between pointer-events-auto">
        <button onClick={handleDec}>prev</button>
        <button onClick={handleInc}>next</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  teacher: state.teacher.teacher,
  loading: state.teacher.loading,
  hasError: state.teacher.hasErrors,
  ui: { week: state.uiData.week }
})

export default connect(mapStateToProps)(WeekNav)
