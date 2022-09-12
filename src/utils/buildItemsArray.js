const renameKey = item => {
  const newItem = { ...item, featuredImage: item.thumbnail ?? null }
  delete newItem.thumbnail
  return newItem
}

export const buildItemsArray = (projects, videos, links) => {
  let items = projects.edges.map(({ node }) => {
    return { ...node }
  })

  videos.edges.forEach(video => {
    const order = video.node.order - 1
    return items.splice(order, 0, renameKey(video.node))
  })
  links.edges.forEach(link => {
    const order = link.node.order - 1
    return items.splice(order, 0, renameKey(link.node))
  })

  return items
}
