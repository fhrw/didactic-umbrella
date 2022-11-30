import { useState } from 'react'
import { connect } from 'react-redux'

function AddStudent({ dispatch, teacher, loading, hasErrors }) {
  return (
    <form>
      <input type="text" />
      <input type="text" />
    </form>
  )
}

const mapStateToProps = (state) => ({
  teacher: state.teacher.teacher,
  loading: state.teacher.loading,
  hasErrors: state.teacher.hasErrors
})

export default connect(mapStateToProps)(AddStudent)
