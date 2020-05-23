exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allSanityProject(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            slug {
              current
            }
          }
        }
      }
      allSanityVideoProject(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            slug {
              current
            }
          }
        }
      }
      allSanityPage {
        edges {
          node {
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const projects = result.data.allSanityProject.edges || []
  const videos = result.data.allSanityVideoProject.edges || []

  const pages = result.data.allSanityPage.edges || []

  projects.forEach((edge, index) => {
    const path = `/${edge.node.slug.current}`
    createPage({
      path,
      component: require.resolve("./src/templates/project.js"),
      context: { slug: edge.node.slug.current },
    })
  })
  videos.forEach((edge, index) => {
    const path = `/${edge.node.slug.current}`
    createPage({
      path,
      component: require.resolve("./src/templates/video.js"),
      context: { slug: edge.node.slug.current },
    })
  })
  pages.forEach((edge, index) => {
    const path = `/${edge.node.slug.current}`
    createPage({
      path,
      component: require.resolve("./src/templates/page.js"),
      context: { slug: edge.node.slug.current },
    })
  })
}
