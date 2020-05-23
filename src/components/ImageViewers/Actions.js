import React from "react"
import styled from "@emotion/styled"
import { padding, margin } from "polished"

export const Button = styled.button(({ active, theme, size = 16 }) => {
  return {
    background: `none`,
    border: `none`,
    fontWeight: active ? `bold` : `normal`,
    fontSize: size,
    ...padding(0, theme.space[1]),
    ...margin(0),
  }
})

const Actions = ({ actions, hasQuote, active }) => {
  let actionsArr = actions
  if (actions.some(action => action.label.includes("Quote")) && !hasQuote) {
    actionsArr = actions.filter(action => !action.label.includes("Quote"))
  }

  return (
    <>
      {actionsArr.map((action, index) => (
        <>
          <Button active={action.key === active} onClick={action.onClick}>
            {action.label}
          </Button>
          {index !== actionsArr.length - 1 && "/"}
        </>
      ))}
    </>
  )
}

export default Actions
