import React from "react"
import { Box, Heading } from "theme-ui"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { Button } from "theme-ui"
import DaneRhys from "../assets/DaneRhys.png"
import { padding, margin } from "polished"
import "./layout.css"
import MainMenu from "./Menu/MainMenu"
import { useScrollBodyLock } from "../utils/bodyScroll"
import { motion, AnimatePresence } from "framer-motion"

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

const Layout = ({ children, removeHeight, location }) => {
  const [showMenu, setShowMenu] = React.useState(false)
  const { lock, unlock } = useScrollBodyLock()
  const isBrowser = typeof window !== "undefined"
  React.useEffect(() => {
    unlock()
  }, [children])

  const handleMenu = option => {
    if (option === "open") {
      if (isBrowser) {
        window.scrollTo(0, 0)
      }
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

  const navTheme = mainNavTheme
  return (
    <>
      <AnimatePresence initial={false}>
        {showMenu && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            style={{ position: "relative", zIndex: 9999 }}
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
          >
            <Box
              style={{
                padding: "32px",
                background: `black`,
              }}
            >
              <MainMenu />
              <Button
                css={{
                  width: 40,
                  color: "white",
                  position: "absolute",
                  right: 32,
                  top: 32,
                }}
                variant="project"
                onClick={() => handleMenu("close")}
              >
                <svg viewBox="0 0 40 40" fill="currentColor">
                  <path
                    fill="currentColor"
                    stroke="white"
                    d="M 10,10 L 30,30 M 30,10 L 10,30"
                  />
                </svg>
              </Button>
            </Box>
          </motion.section>
        )}
      </AnimatePresence>
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
            <img style={{ width: 120 }} src={DaneRhys}></img>
          </Link>
        </Heading>
        <Button
          variant={navTheme.buttonModifier}
          onClick={() => handleMenu("open")}
        >
          Menu
        </Button>
      </nav>
      <Box
        p={4}
        pt={showMenu ? 4 : 6}
        css={{
          height: removeHeight ? `auto` : `100vh`,
          width: `100vw`,
        }}
      >
        {children}
      </Box>
    </>
  )
}

export default Layout
