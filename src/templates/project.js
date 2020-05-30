import React, { useState } from "react"
// import Img from "gatsby-image"
import BlockContent from "../components/BlockContent"
import { Grid, Box, Flex } from "theme-ui"

import IndexView from "../components/ImageViewers/IndexViewer"
import GalleryView from "../components/ImageViewers/GalleryView"
import Actions from "../components/ImageViewers/Actions"
import Layout from "../components/layout"

import { graphql } from "gatsby"
import { useThemeUI } from "theme-ui"

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
  const [isInfoActive, setInfoActive] = useState(false)

  const imageArr = buildImageData(sanityProject)
  const currentImage = imageArr[galleryImage]

  const jumpToImage = image => {
    setGalleryImage(image)
    setDisplayMode("gallery")
  }

  const paginate = direction => {
    if (
      galleryImage + direction === -1 ||
      galleryImage + direction === imageArr.length
    ) {
      return false
    }
    setGalleryImage(galleryImage + direction)
    setIsQuoteActive(false)
  }

  const actions = {
    index: {
      label: "Index",
      onClick: () => {
        setDisplayMode("indexView")
        setIsQuoteActive(false)
        setInfoActive(false)
      },
      isActive: displayMode === "indexView",
    },
    quote: {
      label: "Quote ^",
      onClick: () => setIsQuoteActive(!isQuoteActive),
      isActive: isQuoteActive,
    },
    gallery: {
      label: "Gallery",
      onClick: () => {
        setDisplayMode("gallery")
        setIsQuoteActive(false)
        setInfoActive(false)
      },
      isActive: displayMode === "gallery",
    },
    info: {
      label: "Project Info",
      onClick: () => {
        setInfoActive(!isInfoActive)
        setIsQuoteActive(false)
      },
      isActive: isInfoActive,
    },
  }

  const allActions = [
    actions["gallery"],
    actions["index"],
    actions["info"],
    actions["quote"],
  ]

  const {
    theme: { space },
  } = useThemeUI()

  return (
    <Layout showBackBtn>
      <Grid
        css={{ height: "100%", maxHeight: "100vh" }}
        gap={2}
        columns={[2, "2fr 5fr"]}
      >
        <Box css={{ maxHeight: `calc(100vh - ${2 * space[4]}px)` }}>
          <Flex
            sx={{
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box mt={4}>
              {displayMode === "gallery" && isQuoteActive && (
                <BlockContent blocks={currentImage.content.quote} />
              )}
              {isInfoActive && (
                <BlockContent blocks={sanityProject._rawProjectDescription} />
              )}
            </Box>
            <Box mt={"auto"}>
              {displayMode === "gallery" && (
                <Box mb={4}>
                  <BlockContent blocks={currentImage.content.desc} />
                </Box>
              )}

              <Actions
                hasQuote={
                  currentImage && currentImage.content.quote !== undefined
                }
                actions={allActions}
                active={displayMode}
                isQuoteActive={isQuoteActive}
                IsInfoActive={isInfoActive}
              />
            </Box>
          </Flex>
        </Box>
        <Box css={{ maxHeight: `calc(100vh - 64px)` }}>
          {displayMode === "indexView" && (
            <IndexView
              jumpToImage={jumpToImage}
              images={sanityProject.images}
            />
          )}
          {displayMode === "gallery" && currentImage && (
            <GalleryView
              index={galleryImage}
              currentImage={currentImage}
              increment={() => paginate(1)}
              decrement={() => paginate(-1)}
              images={sanityProject.images}
            />
          )}
        </Box>
      </Grid>
    </Layout>
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
