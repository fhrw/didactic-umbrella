import { useState } from "react";
import { connect } from "react-redux";

import { fetchAddStudent } from "../actions/studentsActions";

function AddStudent({ dispatch, teacher, loading, hasErrors }) {
  const [studentInfo, setStudentInfo] = useState({
    teacher_id: "",
    firstName: "",
    lastName: "",
    school: "eltham",
  });

  if (loading) return <p>loading...</p>;
  if (hasErrors) return <p>errors...</p>;

  function handleChange(event) {
    setStudentInfo({ ...studentInfo, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const body = { ...studentInfo, teacher_id: teacher.id };
    dispatch(fetchAddStudent(body));
    setStudentInfo({ ...studentInfo, firstName: "", lastName: "" });
  }

  function handleCancel() {}

  const inputStyle = "px-2 py-1 rounded-lg shadow-md";
  const buttStyle = "px-4 py-2 text-white";

  return (
    <form className="flex items-center gap-4 bg-neutral-200 p-4 rounded-lg shadow-md self-start">
      <div className="flex flex-col gap-4">
        <input
          className={`${inputStyle}`}
          type="text"
          placeholder="first name"
          name="firstName"
          value={studentInfo.firstName}
          onChange={handleChange}
        />
        <input
          className={`${inputStyle}`}
          type="text"
          placeholder="last name"
          name="lastName"
          value={studentInfo.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          className={`${buttStyle} bg-green-400 hover:bg-green-500 active:bg-green-300 rounded-l-lg`}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className={`${buttStyle} bg-red-400 hover:bg-red-500 active:bg-red-300 rounded-r-lg`}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  teacher: state.teacher.teacher,
  loading: state.teacher.loading,
  hasErrors: state.teacher.hasErrors,
});

export default connect(mapStateToProps)(AddStudent);
