import React from 'react'

const DashContext = React.createContext()

function DashProvider({ children }) {
  const [mode, setMode] = React.useState("idle")
  const value = { mode, setMode, studentTarget, setStudentTarget }
  return <DashContext.Provider value={value}>{children}</DashContext.Provider>
}


export { DashProvider, DashContext }

