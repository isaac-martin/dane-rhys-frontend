export const getUrl = project => {
  if (project.url) return { url: project.url, isExternal: true }
  return { url: "/" + project.slug.current, isExternal: false }
}
