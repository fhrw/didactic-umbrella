export const getLocks = () => ({
  type: "getLocks",
});

export const getLocksSuccess = (locks) => ({
  type: "getLocksSuccess",
  payload: locks,
});

export const getLocksFailure = () => ({
  type: "getLocksFailure",
});

export function fetchLocks(teacher_id, week) {
  return async (dispatch) => {
    dispatch(getLocks());
    try {
      const body = JSON.stringify({ teacher_id: teacher_id, week: week });
      const resp = await fetch("http://localhost:3000/get-locks", {
        method: "POST",
        body: body,
      });
      const data = await resp.json();
      dispatch(getLocksSuccess(data.data));
    } catch (error) {
      dispatch(getLocksFailure());
    }
  };
}

export const addLock = () => ({
  type: "addLock",
});

export const addLockSuccess = (lock) => ({
  type: "addLockSuccess",
  payload: lock,
});

export const addLockFailure = () => ({
  type: "addLockFailure",
});

export function fetchAddLock(student_id, week, slot) {
  return async (dispatch) => {
    dispatch(addLock());
    try {
      const body = JSON.stringify({
        student_id: student_id,
        week: week,
        slot: slot,
      });
      const resp = await fetch("http://localhost:3000/create-lock", {
        method: "POST",
        body: body,
      });
      const data = await resp.json();
      dispatch(addLockSuccess(data.data));
    } catch (error) {
      dispatch(addLockFailure());
    }
  };
}

export const deleteLock = () => ({
  type: "deleteLock",
});

export const deleteLockSuccess = (lock) => ({
  type: "deleteLockSuccess",
  payload: lock,
});

export const deleteLockFailure = () => ({
  type: "deleteLockFailure",
});

export function fetchDeleteLock(lock_id) {
  return async (dispatch) => {
    dispatch(deleteLock());
    try {
      const resp = await fetch(`http://localhost:3000/delete-lock/${lock_id}`, {
        method: "DELETE",
      });
      const data = await resp.json();
      dispatch(deleteLockSuccess(data.data));
    } catch (error) {
      dispatch(deleteLockFailure());
    }
  };
}
