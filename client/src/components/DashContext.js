import React from 'react'

const DashContext = React.createContext({
  uiState: "idle",
  setUiState: function() { }
})

export default DashContext
