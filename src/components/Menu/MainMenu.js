import React from "react"
import Submenu from "./SubMenu"

import { useStaticQuery, graphql } from "gatsby"

const MainMenu = () => {
  const menu = useStaticQuery(graphql`
    query MenuQuery {
      sanityMenu(menuTitle: { eq: "Main Menu" }) {
        menuItems {
          title
          titleLink {
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
          }
        }
        homeImages {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  `)

  const subMenus = menu.sanityMenu.menuItems
  return (
    <section>
      {subMenus.map(sm => (
        <Submenu data={sm} />
      ))}
    </section>
  )
}

export default MainMenu
