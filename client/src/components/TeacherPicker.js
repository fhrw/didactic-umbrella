import { connect } from 'react-redux'

import { fetchAddSlot, fetchDeleteSlot } from '../actions/slotActions'

function TeacherPicker({ dispatch, slots, teacher, ui }) {

  const generic = [
    ["monday 1",
      "monday 2",
      "monday 3",
      "monday 4",
      "monday 5",
      "monday 6"],
    ["tuesday 1",
      "tuesday 2",
      "tuesday 3",
      "tuesday 4",
      "tuesday 5",
      "tuesday 6"],
    ["wednesday 1",
      "wednesday 2",
      "wednesday 3",
      "wednesday 4",
      "wednesday 5",
      "wednesday 6"],
    ["thursday 1",
      "thursday 2",
      "thursday 3",
      "thursday 4",
      "thursday 5",
      "thursday 6"],
    ["friday 1",
      "friday 2",
      "friday 3",
      "friday 4",
      "friday 5",
      "friday 6"]
  ]

  if (slots.loading || teacher.loading) return <p>Loading...</p>
  if (slots.hasErrors || teacher.hasErrors) return <p>Errors...</p>

  function handleOn(teacher_id, week, slot) {
    dispatch(fetchAddSlot(teacher_id, week, slot))
  }

  function handleOff(slot_id) {
    dispatch(fetchDeleteSlot(slot_id))
  }

  return (
    <div>
      {generic.map((day) => {
        return <div>
          {day.map((slot) => {
            const active = slots.find(s => s.slot === slot)
            if (active) return <button onClick={() => handleOff(active.slot_id)}>selected: {active.slot}</button>
            return <button onClick={() => handleOn(teacher.teacher_id, ui.week, slot)}>{slot}</button>
          })}
        </div>
      })}
    </div>
  )
}

const mapStateToProps = (state) => ({
  slots: state.slots.slots, teacher: state.teacher.teacher, loading: { slots: state.slots.loading, teacher: state.teacher.loading }, hasErrors: { slots: state.slots.hasErrors, teacher: state.teacher.hasErrors }, ui: { week: state.uiData.week }
})

export default connect(mapStateToProps)(TeacherPicker)
