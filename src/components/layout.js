/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Box, Heading } from "theme-ui"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { Button } from "theme-ui"

import { padding, margin } from "polished"
import "./layout.css"
import MainMenu from "../components/Menu/MainMenu"
import { useScrollBodyLock } from "../utils/bodyScroll"

export const Back = styled(Link)(({ active, theme, size = 16, width }) => {
  return {
    color: "black",
    background: theme.colors.background,
    position: `fixed`,
    border: `none`,
    fontWeight: active ? `bold` : `normal`,
    fontSize: size,
    ...padding(theme.space[4], 0, theme.space[3]),
    ...margin(0),
    top: 0,
    width,
    zIndex: 9999,
    "::focus": {
      outline: `none`,
    },
  }
})

const Layout = ({ children, removeHeight }) => {
  const [showMenu, setShowMenu] = React.useState(false)
  const { lock, unlock } = useScrollBodyLock()

  const handleMenu = option => {
    if (option === "open") {
      setShowMenu(true)
      lock()
    }
    if (option === "close") {
      setShowMenu(false)
      unlock()
    }
  }

  const mainNavTheme = {
    color: "black",
    background: "white",
    buttonModifier: "menu",
    pb: 30,
  }
  const darkNavTheme = {
    color: "white",
    background: "black",
    buttonModifier: "menuInversed",
    pb: 10,
  }

  const navTheme = showMenu ? darkNavTheme : mainNavTheme
  return (
    <>
      {showMenu && (
        <Box
          style={{
            // position: `relative`,
            // top: 0,
            // right: 0,
            padding: "80px 32px 32px",
            background: `black`,
            zIndex: 299,
          }}
        >
          <MainMenu />
        </Box>
      )}
      <nav
        style={{
          zIndex: 999,
          position: `relative`,
          display: `flex`,
          justifyContent: `space-between`,
          position: "fixed",
          top: 0,
          right: 30,
          left: 30,
          background: navTheme.background,
          padding: `30px 0`,
          paddingBottom: navTheme.pb,
        }}
      >
        <Heading
          as="h4"
          sx={{
            letterSpacing: `0.1em`,
            textTransform: "uppercase",
            fontSize: [2, 2, 2],
            color: navTheme.color,
          }}
        >
          <Link
            style={{ textDecoration: `none`, color: navTheme.color }}
            to="/"
          >
            Dane Rhys
          </Link>
        </Heading>
        <Button
          variant={navTheme.buttonModifier}
          onClick={() => handleMenu(showMenu ? "close" : "open")}
        >
          {!showMenu ? `Menu` : `Close Menu`}
        </Button>
      </nav>
      <Box
        p={4}
        pt={0}
        css={{
          height: removeHeight ? `auto` : `100vh`,
          zIndex: 999,
          width: `100vw`,
        }}
      >
        {children}
      </Box>
    </>
  )
}

export default Layout
