import { useState } from 'react'
import { connect } from 'react-redux'

function AddStudent({ dispatch, teacher, loading, hasErrors }) {
  const [studentInfo, setStudentInfo] = useState({ firstName: "", lastName: "" })

  function handleChange(event) {
    setStudentInfo({ ...studentInfo, [event.target.name]: event.target.value })
  }

  return (
    <form>
      <input type="text" placeholder='first name' name="firstName" value={studentInfo.firstName} onChange={handleChange} />
      <input type="text" placeholder='last name' name="lastName" value={studentInfo.lastName} onChange={handleChange} />
    </form>
  )
}

const mapStateToProps = (state) => ({
  teacher: state.teacher.teacher,
  loading: state.teacher.loading,
  hasErrors: state.teacher.hasErrors
})

export default connect(mapStateToProps)(AddStudent)
