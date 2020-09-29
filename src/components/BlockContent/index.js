import BaseBlockContent from "@sanity/block-content-to-react"
// @jsx jsx
import { jsx } from "theme-ui"
import { Box, Heading } from "theme-ui"
import React from "react"
const serializers = {
  marks: {
    link: ({ mark, children }) => {
      return (
        <a
          sx={{ textDecoration: "underline", color: "text" }}
          href={mark.href}
          target={mark.blank ? "_blank" : "_self"}
        >
          {children}
        </a>
      )
    },
  },

  types: {
    block(props) {
      switch (props.node.style) {
        case "h1":
          return (
            <Heading mb={2} as="h1">
              {props.children}
            </Heading>
          )

        case "h2":
          return (
            <Heading mb={2} as="h2">
              {props.children}
            </Heading>
          )

        case "h3":
          return (
            <Heading mb={2} as="h3">
              {props.children}
            </Heading>
          )

        case "h4":
          return (
            <Heading mb={2} as="h4">
              {props.children}
            </Heading>
          )

        case "blockquote":
          return <blockquote>{props.children}</blockquote>
        case "span":
          return <span>{props.children}</span>

        default:
          return <p>{props.children}</p>
      }
    },
  },
}

const BlockContent = ({ blocks, fontFamily }) => {
  return (
    <Box sx={{ fontFamily }}>
      <BaseBlockContent blocks={blocks} serializers={serializers} />
    </Box>
  )
}

export default BlockContent
