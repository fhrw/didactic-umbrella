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

  const otherLocks = locks.filter((l) => {
    return l.student_id !== student_id;
  });

  const dims = "px-2 py-1";

  return (
    <div className="flex flex-col gap-1 bg-neutral-200 p-4 rounded-lg shadow-md">
      {generic.map((day) => {
        return (
          <div className="flex justify-between gap-1">
            {day.map((slot) => {
              const locked = lockedSlot?.slot === slot;
              const elseWhere = checkForSlot(otherLocks, slot);
              const dayShort = slot.slice(0, 3);
              const num = slot.slice(slot.length - 1);
              if (locked && !elseWhere)
                return (
                  <button className={`${dims} bg-neutral-300 rounded-lg`}>
                    {dayShort} {num}
                  </button>
                );
              if (elseWhere) return <button>can't pick: {slot}</button>;
              return (
                <button
                  className={`${dims} rounded-lg`}
                  onClick={() => handleOn(student_id, ui.week, slot)}
                >
                  {dayShort} {num}
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

function checkForSlot(locks, slot) {
  for (const ele of locks) {
    if (ele.slot === slot) return true;
  }
  return false;
}

const mapStateToProps = (state) => ({
  locks: state.locks.locks,
  loading: state.locks.loading,
  hasErrors: state.locks.hasErrors,
  ui: { week: state.uiData.week },
});

export default connect(mapStateToProps)(LockPicker);
