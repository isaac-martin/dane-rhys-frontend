import React from "react"
/** @jsx jsx */
import { jsx } from "theme-ui"
import styled from "@emotion/styled"
import { padding, margin } from "polished"
import { Box } from "theme-ui"

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

const Actions = ({ actions, hasQuote, textWidth }) => {
  let actionsArr = actions

  if (!hasQuote) {
    actionsArr = actions.filter(action => !action.label.includes("Quote"))
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: ["0", "1", "0"],
        bg: "background",
        pb: ["3", "0", "4"],
        pt: ["3", "2", "2"],
        width: textWidth,
      }}
    >
      {actionsArr.map((action, index) => (
        <>
          <Button
            title={action.label}
            active={action.isActive}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
          {index !== actionsArr.length - 1 && "/"}
        </>
      ))}
    </Box>
  )
}

export default Actions
