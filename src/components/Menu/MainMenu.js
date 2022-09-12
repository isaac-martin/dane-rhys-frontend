import React from "react"
import Submenu from "./SubMenu"
import { useStaticQuery, graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"

const MainMenu = () => {
  const menu = useStaticQuery(graphql`
    query MenuQuery {
      sanityMenu(menuTitle: { eq: "Main Menu" }) {
        menuItems {
          title
          titleLink {
            ... on SanityProjectGroup {
              title
              slug {
                current
              }
            }
            ... on SanityCustomLink {
              title
              url
            }
            ... on SanityPage {
              slug {
                current
              }
              title
            }
            ... on SanityProject {
              slug {
                current
              }
              title
            }
            ... on SanityVideoProject {
              slug {
                current
              }
              title
            }
          }
          menuItems {
            ... on SanityCustomLink {
              id
              url
              title
            }
            ... on SanityPage {
              id
              slug {
                current
              }
              title
            }
            ... on SanityProject {
              id
              slug {
                current
              }
              title
            }
            ... on SanityVideoProject {
              id
              slug {
                current
              }
              title
            }
            ... on SanityProjectGroup {
              id
              slug {
                current
              }
              title
            }
          }
        }
      }
    }
  `)

  const subMenus = menu.sanityMenu.menuItems
  const [openMenu, setMenuOpen] = React.useState("")
  return (
    <>
      {subMenus.map(sm => (
        <Submenu data={sm} openMenu={openMenu} setMenuOpen={setMenuOpen} />
      ))}
    </>
  )
}

export default MainMenu
