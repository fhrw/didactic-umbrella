import { Outlet } from "react-router-dom";
import { connect } from "react-redux"

function Layout(teacher) {
  return (
    <div>
      <Outlet />
    </div>
  )
}

const mapStateToProps = (state) => ({
  teacher: state.teacher.teacher
})

export default connect(mapStateToProps)(Layout)
