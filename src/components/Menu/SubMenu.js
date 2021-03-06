import React from "react"
import Link from "../Link"
import { Box, Flex } from "theme-ui"
import styled from "@emotion/styled"

const headingStyle = theme => ({
  fontSize: 18,
  fontWeight: `bold`,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "black",
  textDecoration: `none`,
})

export const MenuHeading = styled.h3(({ theme }) => ({
  ...headingStyle(),
}))

export const MenuItem = styled(Link)(({ theme }) => ({
  fontSize: 14,
  fontWeight: `normal`,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "black",
  transition: "color .3s ease",
  textDecoration: `none`,
  marginTop: theme.space[2],
  textAlign: 'center',
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

const SubMenu = ({ data: { title, titleLink, menuItems } }) => {
  return (
    <Box marginBottom={3}>
      <nav>
        <Flex sx={{ flexDirection: "column", alignItems: `center` }}>
          {titleLink ? (
            <HeadingLink to={`/${titleLink.slug.current}`}>{title}</HeadingLink>
          ) : (
            <MenuHeading>{title}</MenuHeading>
          )}
          {menuItems.map(item => (
            <MenuItem to={item.url ? item.url : `/${item.slug.current}`}>
              {item.title}
            </MenuItem>
          ))}
        </Flex>
      </nav>
    </Box>
  )
}

export default SubMenu
