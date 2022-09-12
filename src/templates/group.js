import React from "react"
import { graphql } from "gatsby"
import DefaultPage from "../components/page"
import ProjectGrid from "../components/ProjectGrid"
import { buildItemsArray } from "../utils/buildItemsArray"

const ProjectGroup = ({ data, pageContext }) => {
  const { title } = pageContext
  const { allSanityProject, allSanityVideoProject, allSanityCustomLink } = data
  const items = buildItemsArray(
    allSanityProject,
    allSanityVideoProject,
    allSanityCustomLink
  )
  return (
    <DefaultPage pageTitle={title}>
      <ProjectGrid items={items} />
    </DefaultPage>
  )
}

export const query = graphql`
  query ($id: String) {
    allSanityProject(
      filter: { projGroup: { _id: { eq: $id } } }
      sort: { fields: orderRank }
    ) {
      edges {
        node {
          title
          featuredImage {
            asset {
              gatsbyImageData
            }
          }
          slug {
            current
          }
        }
      }
    }
    allSanityVideoProject(filter: { projGroup: { _id: { eq: $id } } }) {
      edges {
        node {
          order
          thumbnail {
            asset {
              gatsbyImageData
            }
          }
          slug {
            current
          }
          title
        }
      }
    }
    allSanityCustomLink(filter: { projGroup: { _id: { eq: $id } } }) {
      edges {
        node {
          url
          order
          title
          thumbnail {
            asset {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`

export default ProjectGroup
