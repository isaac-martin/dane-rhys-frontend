export const getUrl = project => {
  if (project.url) return { url: project.url, isExternal: true }
  if (!project?.slug?.current) {
    console.log("No slug found for project", project)
    return { url: "/", isExternal: false }
  }
  return { url: "/" + project?.slug?.current, isExternal: false }
}
