import { connect } from "react-redux"

function Timetable({ students, history, ui, loading, hasErrors }) {
  if (students.loading) return <p>Loading</p>
  function renderTimetable() {
    if (history.loading) return <p>Loading data</p>
    if (history.hasErrors) return <p>Error in history data</p>
    const relSlots = history.filter(item => item.week == ui.week)
    if (!relSlots.length) return <p>No timetable for this week</p>
    return relSlots.map(item => <p>{item.slot}: {getStudent(item.student_id).first_name}</p>)
  }

  function getStudent(id) {
    return students.find(s => s.student_id == id)
  }

  return (
    <div>
      {renderTimetable()}
    </div>
  )
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  history: state.history.history,
  ui: { week: state.uiData.week },
  loading: { students: state.students.loading, history: state.history.loading },
  hasErrors: { students: state.students.hasErrors, history: state.history.hasErrors }

})

export default connect(mapStateToProps)(Timetable)
