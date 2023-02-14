import { connect } from "react-redux";

import { fetchAddLock, fetchDeleteLock } from "../actions/lockActions";
function LockPicker({ dispatch, locks, student_id, loading, hasErrors, ui }) {
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

  if (loading) return <p>Loading...</p>;
  if (hasErrors) return <p>Error...</p>;

  function handleOn(student_id, week, slot) {
    dispatch(fetchAddLock(student_id, week, slot));
  }

  function handleOff(lock) {
    dispatch(fetchDeleteLock(lock));
  }

  const lockedSlot = locks.find((l) => {
    return l.student_id === student_id;
  });

  return (
    <div>
      {generic.map((day) => {
        return (
          <div>
            {day.map((slot) => {
              const locked = lockedSlot?.slot === slot;
              if (locked) return <button>locked: {slot}</button>;
              return (
                <button onClick={() => handleOn(student_id, ui.week, slot)}>
                  {slot}
                </button>
              );
            })}
          </div>
        );
      })}
      <button onClick={() => handleOff(lockedSlot?.id)}>clear</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  locks: state.locks.locks,
  loading: state.locks.loading,
  hasErrors: state.locks.hasErrors,
  ui: { week: state.uiData.week },
});

export default connect(mapStateToProps)(LockPicker);
