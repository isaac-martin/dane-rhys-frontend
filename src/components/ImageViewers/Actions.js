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

const Actions = ({ actions, textWidth }) => {
  let actionsArr = actions

  return (
    <Box
      sx={{
        mt: "auto",
        pt: "3",
        position: ["fixed", "fixed", "fixed"],
        bottom: [0],
        left: 0,
        pl: "4",
        pb: "2",
        background: "white",
        zIndex: 199,
        width: ["95vw", "95vw", textWidth],
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
      {/* </Box> */}
    </Box>
  )
}

export default Actions
