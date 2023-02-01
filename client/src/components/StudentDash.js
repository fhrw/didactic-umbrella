import { connect } from 'react-redux'

import { DashContext } from "./DashContext"
import { fetchDeleteStudent } from '../actions/studentsActions'
import { useContext } from 'react'
import ConstraintPicker from './ConstraintPicker'
import Lockpicker from './Lockpicker.js'

function StudentDash({ dispatch, students, constraints }) {
  const viewState = useContext(DashContext)
  if (students.loading) return <p>Loading students</p>
  if (students.hasErrors) return <p>Error loading students</p>
  if (!students.length) return <p>No students to display</p>
  return (
    <div className='w-1/2 flex flex-col gap-y-4'>
      {students.map((student) => {
        const stuCons = constraints.filter((constraint) => constraint.student_id == student.id)
        return Student(student, stuCons, dispatch, viewState.setMode, viewState.setStudentTarget)
      })}
      {viewState.mode === "editConstraint" && <ConstraintPicker student_id={viewState.studentTarget} />}
      {viewState.mode === "editLock" && <LockPicker student_id={viewState.studentTarget} />}
    </div>
  )
}

function Student(student, constraints, dispatch, editFunc, targetFunc) {
  const name = student.first_name + ' ' + student.last_name

  function handleDelete() {
    dispatch(fetchDeleteStudent(student.id))
  }

  function handleEdit() {
    editFunc("editConstraint")
    targetFunc(student.id)
  }

  return (
    <div className='w-full flex justify-between'>
      <div className='flex flex-col items-start'>
        <p>{name}</p>
        <button onClick={handleDelete}>delete me</button>
        <button onClick={handleEdit}>edit me</button>
        <button>lock</button>
      </div>
      <div className='flex flex-wrap gap-x-1 w-3/4'>{constraints.map(c => <p>{c.slot}</p>)}</div>
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

