import { useState } from 'react'
import { connect } from 'react-redux'

import { fetchAddStudent } from '../actions/studentsActions'

function AddStudent({ dispatch, teacher, loading, hasErrors }) {
  const [studentInfo, setStudentInfo] = useState({ teacher_id: teacher.teacher_id, firstName: "", lastName: "", school: "eltham" })

  if (loading) return <p>loading...</p>
  if (hasErrors) return <p>errors...</p>


  function handleChange(event) {
    setStudentInfo({ ...studentInfo, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(fetchAddStudent(studentInfo))
    setStudentInfo({ ...studentInfo, firstName: "", lastName: "" })
  }

  function handleCancel() {

  }

  return (
    <form>
      <input type="text" placeholder='first name' name="firstName" value={studentInfo.firstName} onChange={handleChange} />
      <input type="text" placeholder='last name' name="lastName" value={studentInfo.lastName} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  )
}

const mapStateToProps = (state) => ({
  teacher: state.teacher.teacher,
  loading: state.teacher.loading,
  hasErrors: state.teacher.hasErrors
})

export default connect(mapStateToProps)(AddStudent)
