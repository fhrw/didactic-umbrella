import React from 'react'

const DashContext = React.createContext()

function DashProvider({ children }) {
  const [mode, setMode] = React.useState("idle")
  const [studentTarget, setStudentTarget] = React.useState(0)
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { mode, setMode, studentTarget, setStudentTarget }
  return <DashContext.Provider value={value}>{children}</DashContext.Provider>
}


export { DashProvider, DashContext }

