import { connect } from 'react-redux'

function StudentDash({ students, constraints }) {
  if (students.loading) return <p>Loading students</p>
  if (students.hasErrors) return <p>Error loading students</p>
  if (!students.length) return <p>No students to display</p>
  return (
    <div>
      {students.map((student) => {
        const stuCons = constraints.filter((constraint) => constraint.student_id == student.student_id)
        return Student(student, stuCons)
      })}
    </div>
  )
}

function Student(student, constraints) {
  const name = student.first_name + ' ' + student.last_name
  return (
    <div>
      <p>{name}</p>
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

