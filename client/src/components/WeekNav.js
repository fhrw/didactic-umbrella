import { connect } from "react-redux"
import { setWeek } from '../actions/uiActions'

function WeekNav({ dispatch, ui, teacher, loading, hasErrors }) {
  function handleInc() {
    if (ui.week < teacher.term_length) {
      dispatch(setWeek(1))
    }
  }
  function handleDec() {
    if (ui.week > 0) {
      dispatch(setWeek(-1))
    }
  }
  return (
    <div>
      <button onClick={handleDec}>prev</button>
      <button onClick={handleInc}>next</button>
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
