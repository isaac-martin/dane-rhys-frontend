import React, { useState } from "react"
// @jsx jsx
import { jsx } from "theme-ui"
import BlockContent from "../components/BlockContent"
import { Grid, Box, Flex } from "theme-ui"

import IndexView from "../components/ImageViewers/IndexViewer"
import GalleryView from "../components/ImageViewers/GalleryView"
import Actions from "../components/ImageViewers/Actions"
import Layout from "../components/layout"

import { graphql } from "gatsby"
import { useThemeUI } from "theme-ui"
import SEO from "../components/seo"

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
    setInfoActive(false)
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
      onClick: () => {
        setIsQuoteActive(!isQuoteActive)
        setInfoActive(false)
      },
      isActive: isQuoteActive,
    },
    gallery: {
      label: "Gallery",
      onClick: () => {
        setInfoActive(false)
        setDisplayMode("gallery")
        setIsQuoteActive(false)
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
    theme: { space, textWidth },
  } = useThemeUI()

  const { socialSharing, _rawSocialSharing } = sanityProject
  return (
    <Layout showBackBtn>
      <SEO
        title={sanityProject.title}
        image={socialSharing && socialSharing.image.asset.url}
        description={
          socialSharing && _rawSocialSharing.text[0].children[0].text
        }
      />

      <Grid gap={4} columns={["auto", "350px 1fr"]}>
        <Box css={{ height: [0, 0, `calc(100vh - ${2 * space[4]}px)`] }}>
          <Flex
            sx={{
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: ["calc(100% - 64px)", "100%", textWidth],
                position: "fixed",
                overflow: "scroll",
                height: [
                  isQuoteActive || isInfoActive ? `100vh` : `auto`,
                  `95vh`,
                  `89vh`,
                ],
                paddingBottom: "30px",
                zIndex: 999,
                bg: ["transparent", "background", "transparent"],
              }}
            >
              <Box
                sx={{
                  bg: "background",
                  height: isQuoteActive || isInfoActive ? "95%" : "auto",
                }}
                mt={[0, 0, 5]}
                mb={4}
                pr={[0, 0, 2]}
                pt={[isQuoteActive || isInfoActive ? 5 : 2, 0, 0]}
              >
                {displayMode === "gallery" && isQuoteActive && (
                  <BlockContent
                    fontFamily="desc"
                    blocks={currentImage.content.quote}
                  />
                )}
                {isInfoActive && (
                  <BlockContent blocks={sanityProject._rawProjectDescription} />
                )}
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  left: 0,
                  bgcol: "bodybg",
                }}
              >
                {displayMode === "gallery" && !isInfoActive && (
                  <Box
                    // className="noMb"
                    sx={{
                      // textTransform: "uppercase",
                      display: ["none", "inherit", "inherit"],
                    }}
                    mb={4}
                  >
                    <BlockContent
                      fontFamily="desc"
                      blocks={currentImage.content.desc}
                    />
                  </Box>
                )}

                <Actions
                  textWidth={textWidth}
                  hasQuote={
                    displayMode === "gallery" &&
                    currentImage &&
                    currentImage.content.quote !== undefined
                  }
                  actions={allActions}
                  active={displayMode}
                  isQuoteActive={isQuoteActive}
                  IsInfoActive={isInfoActive}
                />
              </Box>
            </Box>
          </Flex>
        </Box>
        <Box css={{ height: "90vh", zIndex: 99 }}>
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
              increment={() => {
                paginate(1)
                setInfoActive(false)
              }}
              decrement={() => {
                paginate(-1)
                setInfoActive(false)
              }}
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
      socialSharing {
        image {
          asset {
            url
          }
        }
      }
      _rawSocialSharing
    }
  }
`

export default ProjectTemplate
