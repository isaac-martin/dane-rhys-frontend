import React from "react"

const Actions = ({ actions }) => {
  return (
    <>
      {actions.map(action => (
        <button onClick={action.onClick}>{action.label}</button>
      ))}
    </>
  )
}

export default Actions
