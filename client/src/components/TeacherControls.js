import { connect } from "react-redux"

// actions
import { modifyTeacher } from '../actions/teacherActions'

function TeacherControls({ dispatch, teacher }) {
  function handleAdd() {
    const n = { ...teacher, term_length: teacher.term_length + 1 }
    dispatch(modifyTeacher(teacher.teacher_id, n))
  }

  function handleDel() {
    const n = { ...teacher, term_length: teacher.term_length - 1 }
    dispatch(modifyTeacher(teacher.teacher_id, n))
  }
  return (
    <div>
      <button onClick={handleDel}>Delete Week</button>
      <button onClick={handleAdd}>Add Week</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  teacher: state.teacher.teacher,
  loading: state.teacher.loading,
  hasError: state.teacher.hasErrors
})

export default connect(mapStateToProps)(TeacherControls)
