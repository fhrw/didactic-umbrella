import { connect } from "react-redux";

import {
  fetchAddConstraint,
  fetchDelConstraint,
} from "../actions/constraintsActions";

function ConstraintPicker({
  dispatch,
  constraints,
  student_id,
  loading,
  hasErrors,
  ui,
}) {
  const generic = [
    ["monday 1", "monday 2", "monday 3", "monday 4", "monday 5", "monday 6"],
    [
      "tuesday 1",
      "tuesday 2",
      "tuesday 3",
      "tuesday 4",
      "tuesday 5",
      "tuesday 6",
    ],
    [
      "wednesday 1",
      "wednesday 2",
      "wednesday 3",
      "wednesday 4",
      "wednesday 5",
      "wednesday 6",
    ],
    [
      "thursday 1",
      "thursday 2",
      "thursday 3",
      "thursday 4",
      "thursday 5",
      "thursday 6",
    ],
    ["friday 1", "friday 2", "friday 3", "friday 4", "friday 5", "friday 6"],
  ];

  // if (loading) return <p>Loading...</p>;
  if (hasErrors) return <p>Error...</p>;

  function handleOn(student_id, week, slot) {
    dispatch(fetchAddConstraint(student_id, week, slot));
  }

  function handleOff(constraint_id) {
    dispatch(fetchDelConstraint(constraint_id));
  }

  const constrainedSlots = constraints.filter((c) => {
    return c.student_id === student_id;
  });

  const dims = "px-2 py-1 w-16 h-10";

  return (
    <div className="flex flex-col gap-2 bg-neutral-200 p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-neutral-600">So and so's Constraints</h3>
      {generic.map((day) => {
        return (
          <div className="flex justify-between gap-2">
            {day.map((slot) => {
              const dayShort = slot.slice(0, 3);
              const num = slot.slice(slot.length - 1);
              const constrained = constrainedSlots.find((c) => c.slot === slot);
              if (constrained)
                return (
                  <button
                    className={`${dims} bg-green-400 hover:bg-green-500 active:bg-green-300 font-semibold text-neutral-100 rounded-lg shadow-md`}
                    onClick={() => handleOff(constrained.id)}
                  >
                    {dayShort} {num}
                  </button>
                );
              return (
                <button
                  className={`${dims} bg-neutral-300 hover:bg-slate-300 active:bg-slate-400 text-neutral-600 rounded-md shadow-md`}
                  onClick={() => handleOn(student_id, ui.week, slot)}
                >
                  {dayShort} {num}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  constraints: state.constraints.constraints,
  loading: state.constraints.loading,
  hasErrors: state.constraints.hasErrors,
  ui: { week: state.uiData.week },
});

export default connect(mapStateToProps)(ConstraintPicker);
