exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

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
      allSanityProjectGroup(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            _id
            title
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
      sanitySiteSettings {
        redirects {
          from
          to
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const projects = result.data.allSanityProject.edges || []
  const groups = result.data.allSanityProjectGroup.edges || []

  const videos = result.data.allSanityVideoProject.edges || []
  const pages = result.data.allSanityPage.edges || []
  const redirects = result.data.sanitySiteSettings.redirects || []
  groups.forEach(edge => {
    const path = `/${edge.node.slug.current}`
    createPage({
      path: path === "/featured" ? "/" : path,
      component: require.resolve("./src/templates/group.js"),
      context: {
        slug: edge.node.slug.current,
        id: edge.node._id,
        title: edge.node.title,
      },
    })
  })

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
  redirects.forEach(redirect => {
    createRedirect({
      fromPath: redirect.from,
      toPath: redirect.to,
      isPermanent: true,
    })
  })
}
