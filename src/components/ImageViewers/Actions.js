import React from "react"

const Actions = ({ actions, displayMode }) => {
let actionsArr = actions
if (displayMode === "indexView"){
actionsArr = actions.filter(action => action.label !== "Quote")
}
  return (
    <>
      {actionsArr.map(action => (
        <button onClick={action.onClick}>{action.label}</button>
      ))}
    </>
  )
}

export default Actions
