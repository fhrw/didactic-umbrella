import { connect } from 'react-redux'

import { fetchAddSlot, fetchDeleteSlot, fetchPrevSlots } from '../actions/slotActions'
function SlotPicker({ dispatch, slots, teacher_id, loading, hasErrors, ui }) {
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

  if (loading) return <p>Loading...</p>
  if (hasErrors) return <p>Error...</p>

  function handleOn(teacher_id, week, slot) {
    if (ui.week == 0) return
    if (teacher_id == 0) return
    dispatch(fetchAddSlot(teacher_id, week, slot))
  }

  function handleOff(slot_id) {
    dispatch(fetchDeleteSlot(slot_id))
  }

  function handleCopyLast() {
    dispatch(fetchPrevSlots(teacher_id, ui.week))
  }


  return (
    <div>
      <button onClick={handleCopyLast}>Copy Prev.</button>
      {generic.map((day) => {
        return <div>
          {day.map((slot) => {
            const selected = slots?.find(s => s.slot === slot)
            if (selected) return <button onClick={() => handleOff(selected.id)}>selected: {slot}</button>
            return <button onClick={() => handleOn(teacher_id, ui.week, slot)}>{slot}</button>
          })}
        </div>
      })}
    </div>
  )

}

const mapStateToProps = (state) => ({ slots: state.slots.slots, loading: state.slots.loading, hasErrors: state.slots.hasErrors, ui: { week: state.uiData.week } })

export default connect(mapStateToProps)(SlotPicker)
