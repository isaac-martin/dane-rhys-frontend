import React from "react"
import { graphql } from "gatsby"
import DefaultPage from "../components/page"
import { GatsbyImage } from "gatsby-plugin-image"
import { useThemeUI, Grid, Heading } from "theme-ui"
import { Link } from "gatsby"

const IndexPage = props => {
  const {
    theme: { space },
  } = useThemeUI()
  console.log(props.data)
  const menuItems = props.data.sanityMenu.homeFeaturedItems

  return (
    <DefaultPage title="Home Page">
      <Grid
        mt={[20, 20, "auto"]}
        gap={16}
        columns={[
          [4, "1fr 1fr 1fr 1fr"],
          [4, "1fr 1fr 1fr 1fr"],
          [(4, "1fr 1fr 1fr 1fr")],
        ]}
        pb={4}
      >
        {menuItems.map(({ image, project }) => {
          // console.log(item)
          // if (!item.id) return null

          return (
            <Link
              style={{
                color: `black`,
                textDecoration: `none`,
                fontWeight: `bold`,
              }}
              to={project.slug.current}
            >
              <GatsbyImage
                image={image.asset.gatsbyImageData}
                style={{ width: "100%", marginBottom: space[2] }}
                imgStyle={{ objectFit: "contain" }}
              />
              <p>{project.title}</p>
            </Link>
          )
        })}
      </Grid>
    </DefaultPage>
  )
}

export const homeQuery = graphql`
  query Home {
    sanityMenu(menuTitle: { eq: "Main Menu" }) {
      homeFeaturedItems {
        image {
          asset {
            gatsbyImageData
          }
        }
        project {
          ... on SanityProject {
            id
            title
            slug {
              current
            }
          }
          ... on SanityVideoProject {
            id
            title
            slug {
              current
            }
          }
        }
      }
    }
  }
`

export default IndexPage
