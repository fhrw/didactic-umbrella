import { connect } from "react-redux"

// actions
import { modifyTeacher } from '../actions/teacherActions'
import { fetchRecalc } from '../actions/historyActions'

function TeacherControls({ dispatch, teacher, ui }) {
	function handleAdd() {
		const n = { ...teacher, term_length: teacher.term_length + 1 }
		dispatch(modifyTeacher(teacher.teacher_id, n))
	}

	function handleDel() {
		const n = { ...teacher, term_length: teacher.term_length - 1 }
		dispatch(modifyTeacher(teacher.teacher_id, n))
	}

	function handleCalc() {
		dispatch(fetchRecalc(teacher.teacher_id, ui.week))
	}

	return (
		<div>
			<button onClick={handleDel}>Delete Week</button>
			<button onClick={handleAdd}>Add Week</button>
			<button onClick={handleCalc}>Calculate Timetable</button>
		</div>
	)
}

const mapStateToProps = (state) => ({
	teacher: state.teacher.teacher,
	ui: { week: state.uiData.week },
	loading: state.teacher.loading,
	hasError: state.teacher.hasErrors
})

export default connect(mapStateToProps)(TeacherControls)
