import { connect } from "react-redux";

function Timetable({ students, history, ui, loading, hasErrors }) {
  if (students.loading) return <p>Loading</p>;

  function renderTimetable() {
    if (history.loading) return <p>Loading data</p>;
    if (history.hasErrors) return <p>Error in history data</p>;
    const relSlots = history.filter((item) => item.week == ui.week);
    if (!relSlots.length) return <p>No timetable for this week</p>;
    return relSlots.map((item) => {
      const name = getStudent(item.student_id);
      return (
        <p>
          {item.slot}: {name ? name.first_name : "deleted student"}
        </p>
      );
    });
  }

  function getStudent(id) {
    return students.find((s) => {
      return s.id == id;
    });
  }

  return <div>{renderTimetable()}</div>;
}

const AllSlots = [
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

function NewTimetable({ students, history, ui, loading, hasErrors }) {
  if (loading.students) return <p>Loading</p>;
  if (hasErrors.students) return <p>Error in history data</p>;
  if (loading.history) return <p>Loading data</p>;
  if (hasErrors.history) return <p>Error in history data</p>;

  const allocatedSlots = history.filter((s) => s.week === ui.week);

  return (
    <div className="flex gap-x-2 bg-yellow-400 p-4 text-white rounded-lg shadow-md">
      {AllSlots.map((d) => {
        return (
          <div>
            <h4 className="font-bold">{d[0].slice(0, d[0].length - 2)}</h4>
            {d.map((s) => {
              const id = GetAllocatedId(allocatedSlots, s);
              const name = students.find((s) => s.id === id);
              const nameOut = name ? name.first_name : "";
              return <p>{s.slice(s.length - 1) + ": " + nameOut}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

function GetAllocatedId(a_slots, t_slot) {
  const allocation = a_slots.find((s) => s.slot === t_slot);
  if (!allocation) {
    return -1;
  }
  return allocation.student_id;
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  history: state.history.history,
  ui: { week: state.uiData.week },
  loading: { students: state.students.loading, history: state.history.loading },
  hasErrors: {
    students: state.students.hasErrors,
    history: state.history.hasErrors,
  },
});

export const ConnectedTimetable = connect(mapStateToProps)(Timetable);
export const ConnectedNewTimetable = connect(mapStateToProps)(NewTimetable);
