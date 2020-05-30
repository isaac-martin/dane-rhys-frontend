/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Box } from "theme-ui"
import styled from "@emotion/styled"
import { useStaticQuery, graphql, Link } from "gatsby"
import { padding, margin } from "polished"
import "./layout.css"

export const Back = styled(Link)(({ active, theme, size = 16 }) => {
  return {
    color: "black",
    background: theme.colors.background,
    position: `fixed`,
    border: `none`,
    fontWeight: active ? `bold` : `normal`,
    fontSize: size,
    ...padding(theme.space[4], 0, theme.space[3]),
    ...margin(0),
    width: "100%",
    top: 0,
    zIndex: 9,
  }
})

const Layout = ({ children, showBackBtn }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Box p={4} css={{ height: `100vh` }}>
      {showBackBtn && <Back to="/">Back</Back>}
      {children}
    </Box>
  )
}

export default Layout
