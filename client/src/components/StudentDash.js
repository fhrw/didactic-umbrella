import { connect } from 'react-redux'

import { DashContext } from "./DashContext"
import { fetchDeleteStudent } from '../actions/studentsActions'
import { useContext } from 'react'
import ConstraintPicker from './ConstraintPicker'

function StudentDash({ dispatch, students, constraints }) {
  const viewState = useContext(DashContext)
  if (students.loading) return <p>Loading students</p>
  if (students.hasErrors) return <p>Error loading students</p>
  if (!students.length) return <p>No students to display</p>
  return (
    <div>
      {students.map((student) => {
        const stuCons = constraints.filter((constraint) => constraint.student_id == student.student_id)
        return Student(student, stuCons, dispatch, viewState.setMode, viewState.setStudentTarget)
      })}
      {viewState.mode === "edit" && <ConstraintPicker student_id={viewState.studentTarget} />}
    </div>
  )
}

function Student(student, constraints, dispatch, editFunc, targetFunc) {
  const name = student.first_name + ' ' + student.last_name

  function handleDelete() {
    dispatch(fetchDeleteStudent(student.student_id))
  }

  function handleEdit() {
    editFunc("edit")
    targetFunc(student.student_id)
  }

  return (
    <div>
      <p>{name}</p>
      <button onClick={handleDelete}>delete me</button>
      <button onClick={handleEdit}>edit me</button>
      <div>{constraints.map(c => <p>{c.slot}</p>)}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  constraints: state.constraints.constraints,
  loading: { students: state.students.loading, constraints: state.constraints.loading },
  hasErrors: { students: state.students.hasErrors, constraints: state.constraints.hasErrors }

})

export default connect(mapStateToProps)(StudentDash)

