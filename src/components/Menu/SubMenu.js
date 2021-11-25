import React from "react"
import Link from "../Link"
import { Box, Flex } from "theme-ui"
import styled from "@emotion/styled"

const headingStyle = () => ({
  fontSize: 18,
  fontWeight: `bold`,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "white",
  textDecoration: `none`,
})

export const MenuHeading = styled.h3(() => ({
  ...headingStyle(),
  cursor: `pointer`,
  marginBottom: 5,
}))

export const MenuItem = styled(Link)(({ theme }) => ({
  fontSize: 14,
  fontWeight: `normal`,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "white",
  transition: "color .3s ease",
  textDecoration: `none`,
  marginTop: theme.space[2],
  textAlign: "left",
  ":hover": {
    color: theme.colors.primary,
  },
}))

const HeadingLink = styled(Link)(({ theme }) => ({
  ...headingStyle(),
  ":hover": {
    color: theme.colors.primary,
    cursor: "pointer",
  },
}))

const SubMenu = ({
  data: { title, titleLink, menuItems },
  setMenuOpen,
  openMenu,
}) => {
  return (
    <Box marginBottom={3}>
      <nav>
        <Flex sx={{ flexDirection: "column", alignItems: `flex-start` }}>
          {titleLink ? (
            <HeadingLink to={`/${titleLink.slug.current}`}>{title}</HeadingLink>
          ) : (
            <MenuHeading
              onClick={() => setMenuOpen(openMenu === title ? "" : title)}
            >
              {title}
            </MenuHeading>
          )}
          {openMenu === title && (
            <div style={{ display: `flex`, flexWrap: `wrap` }}>
              {menuItems.map((item, idx) => (
                <div style={{ padding: `5px 0` }}>
                  <MenuItem to={item.url ? item.url : `/${item.slug.current}`}>
                    {item.title}
                  </MenuItem>
                  {idx !== menuItems.length - 1 && (
                    <span
                      style={{
                        margin: `0 20px`,
                        fontWeight: `bold`,
                        color: "white",
                      }}
                    >
                      |
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </Flex>
      </nav>
    </Box>
  )
}

export default SubMenu
