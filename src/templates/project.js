import React, { useState } from "react"
// import Img from "gatsby-image"
import BlockContent from "../components/BlockContent"
import { Grid, Box } from "theme-ui"

import IndexView from "../components/ImageViewers/IndexViewer"
import GalleryView from "../components/ImageViewers/GalleryView"
import Actions from "../components/ImageViewers/Actions"

import { graphql } from "gatsby"

const buildImageData = project => {
  const { images, _rawImages } = project
  return images.map((image, i) => ({
    image: image.image,
    content: {
      desc: _rawImages[i].description,
      quote: _rawImages[i].quote,
    },
  }))
}

const ProjectTemplate = ({ data: { sanityProject } }) => {
  const [displayMode, setDisplayMode] = useState("indexView")
  const [galleryImage, setGalleryImage] = useState(0)
  const [isQuoteActive, setIsQuoteActive] = useState(false)

  const currentImage = buildImageData(sanityProject)[galleryImage]

  const jumpToImage = image => {
    setGalleryImage(image)
    setDisplayMode("gallery")
  }

  const actions = [
    {
      label: "Gallery",
      onClick: () => {
        setDisplayMode("gallery")
        setIsQuoteActive(false)
      },
    },
    {
      label: "Index",
      onClick: () => {
        setDisplayMode("indexView")
        setIsQuoteActive(false)
      },
    },
  ]

  const quoteAction = [
    {
      label: "Quote",
      onClick: () => setIsQuoteActive(!isQuoteActive),
    },
  ]

  return (
    <>
      <Grid gap={2} columns={[2, "1fr 2fr"]}>
        <Box>
          {displayMode === "gallery" && isQuoteActive && (
            <BlockContent blocks={currentImage.content.quote} />
          )}
          {displayMode === "gallery" && (
            <BlockContent blocks={currentImage.content.desc} />
          )}
          <Actions
            displayMode={displayMode}
            actions={
              displayMode === "gallery" && currentImage.content.quote
                ? [...actions, ...quoteAction]
                : actions
            }
          />
        </Box>
        <Box>
          {displayMode === "indexView" && (
            <IndexView
              jumpToImage={jumpToImage}
              images={sanityProject.images}
            />
          )}
          {displayMode === "gallery" && (
            <GalleryView
              currentImage={currentImage}
              increment={() => setGalleryImage(galleryImage - 1)}
              decrement={() => setGalleryImage(galleryImage + 1)}
              images={sanityProject.images}
            />
          )}
        </Box>
      </Grid>
    </>
  )
}

export const projectData = graphql`
  query ProjectQuery($slug: String) {
    sanityProject(slug: { current: { eq: $slug } }) {
      title
      _rawProjectDescription(resolveReferences: { maxDepth: 10 })
      _rawImages(resolveReferences: { maxDepth: 10 })
      images {
        image {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`

export default ProjectTemplate
