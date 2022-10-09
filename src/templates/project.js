import React, { useState } from "react"
// @jsx jsx
import { jsx } from "theme-ui"
import BlockContent from "../components/BlockContent"
import { Grid, Box, Flex, Text, Button } from "theme-ui"
import { useResponsiveValue } from "@theme-ui/match-media"

import IndexView from "../components/ImageViewers/IndexViewer"
import GalleryView from "../components/ImageViewers/GalleryView"
import Actions from "../components/ImageViewers/Actions"
import Layout from "../components/layout"

import { graphql, Link } from "gatsby"
import { useThemeUI } from "theme-ui"
import SEO from "../components/seo"
import Modal from "react-modal"
import { useScrollBodyLock } from "../utils/bodyScroll"
import PasswordProtect from "../components/PasswordProtect"

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isQuoteShown, setQuoteShow] = useState(false)
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(0)
  const [showPage, setShowPage] = useState(
    sanityProject.password ? false : true
  )

  const { lock, unlock } = useScrollBodyLock()

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
  }

  const actions = {
    index: {
      label: "Index",
      onClick: () => {
        setDisplayMode("indexView")
        setQuoteShow(false)
      },
      isActive: displayMode === "indexView",
    },
    gallery: {
      label: "Gallery",
      onClick: () => {
        setDisplayMode("gallery")
      },
      isActive: displayMode === "gallery",
    },
  }

  const allActions = [actions["gallery"], actions["index"]]

  const {
    theme: { space, textWidth },
  } = useThemeUI()

  const ImageDescription = () => (
    <BlockContent
      marginBottom="0"
      fontFamily="desc"
      marginTop={20}
      blocks={currentImage.content.desc}
    />
  )

  const ImageQuoteModal = () => (
    <BlockContent fontFamily="desc" blocks={currentImage.content.quote} />
  )

  const ProjectDescModal = () => (
    <Box>
      <Box sx={{ display: ["initial", "initial", "none"] }}>
        <BlockContent blocks={sanityProject._rawProjectIntro} />
      </Box>
      <BlockContent blocks={sanityProject._rawProjectDescription} />
    </Box>
  )

  const ProjectIntro = () => (
    <BlockContent
      marginBottom="0"
      marginTop="4"
      blocks={sanityProject._rawProjectIntro}
    />
  )

  const { socialSharing, _rawSocialSharing } = sanityProject

  const imageHasQuote = currentImage && currentImage.content.quote
  const projectHasDescription = sanityProject._rawProjectDescription

  const ModalOpenBtn = ({ variant = "primary" }) => (
    <Button variant={variant} onClick={() => setIsModalOpen(true)}>
      Read More
    </Button>
  )

  const closeModal = () => setIsModalOpen(false)

  const display = useResponsiveValue(["flex", "flex", "flex"])

  const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 999,
      display,
      alignItems: `center`,
      justifyContent: `center`,
    },
    content: {
      position: "relative",
      inset: 0,
      top: "initial",
      left: "initial",
      right: "initial",
      bottom: "initial",
      width: "100vw",
      maxWidth: "min(1200px, 100vw)",
      maxHeight: "min(850px, 100vh)",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "30px",
      alignSelf: `center`,
    },
  }

  const mobileHeader = React.useRef(null)

  React.useEffect(() => {
    const height = mobileHeader.current ? mobileHeader.current.clientHeight : 30
    setMobileHeaderHeight(height)
  }, [])

  return (
    <Layout>
      <SEO
        title={sanityProject.title}
        image={socialSharing && socialSharing.image.asset.url}
        description={
          socialSharing && _rawSocialSharing.text[0].children[0].text
        }
      />
      {!showPage ? (
        <PasswordProtect
          title={sanityProject.title}
          featuredImage={sanityProject.featuredImage}
          password={sanityProject.password}
          onSuccess={() => setShowPage(true)}
        />
      ) : (
        <>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
            style={modalStyles}
            onAfterOpen={lock}
            onAfterClose={unlock}
          >
            <Grid gap={2} columns={"1fr 30px"}>
              <ProjectDescModal />
              <Button
                variant="clear"
                sx={{
                  zIndex: 99,
                  display: "block",
                  width: 35,
                  height: 35,
                  position: "sticky",
                  top: 0,
                  fontSize: "26px",
                  transform: `translateY(-5px)`,
                }}
                onClick={() => setIsModalOpen(false)}
              >
                <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M13 7l-6 6M7 7l6 6"
                    stroke="black"
                    strokeWidth={1.333}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 20C4.482 20 0 15.518 0 10S4.482 0 10 0s10 4.482 10 10-4.482 10-10 10zm0-18.182c-4.51 0-8.182 3.673-8.182 8.182 0 4.51 3.673 8.182 8.182 8.182 4.51 0 8.182-3.673 8.182-8.182 0-4.51-3.673-8.182-8.182-8.182z"
                    fill="black"
                  />
                </svg>
              </Button>
            </Grid>
          </Modal>

          <Grid
            gap={4}
            columns={["auto", "auto", "380px 1fr"]}
            sx={{ position: "relative" }}
          >
            <Box
              id="textArea"
              sx={{
                height: [
                  `calc(50vh - ${2 * space[4]}px)`,
                  `calc(40vh - ${2 * space[4]}px)`,
                  `calc(100vh - ${2 * space[4]}px)`,
                ],
                gridRowStart: [2, 2, 1],
                position: "sticky",
                top: "4",
              }}
            >
              <Flex
                sx={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  height: ["auto", "auto", "100%"],
                  position: "absolute",
                  maxWidth: "380px",
                }}
              >
                <Box>
                  <Text
                    as="h2"
                    sx={{
                      fontWeight: 600,
                      fontSize: 2,
                      display: ["none", "none", "inherit"],
                    }}
                  >
                    <Button
                      css={{ textAlign: "left" }}
                      variant="project"
                      onClick={() =>
                        setDisplayMode(
                          displayMode === "indexView" ? "gallery" : "indexView"
                        )
                      }
                      style={{ fontWeight: "bold" }}
                    >
                      {sanityProject.title}
                    </Button>
                  </Text>
                  {displayMode === "indexView" && (
                    <Box sx={{ display: ["none", "none", "initial"] }}>
                      <ProjectIntro />
                      {projectHasDescription && <ModalOpenBtn />}
                    </Box>
                  )}
                  {displayMode === "gallery" && <ImageDescription />}
                </Box>

                {imageHasQuote && displayMode === "gallery" && (
                  <Box sx={{ overflowY: "scroll", flex: "1" }}>
                    <Box
                      sx={{
                        position: "sticky",
                        top: 0,
                        pb: 3,
                        background: "white",
                      }}
                    >
                      <Button onClick={() => setQuoteShow(quote => !quote)}>
                        Read {isQuoteShown ? "Less" : "More"}
                      </Button>
                    </Box>
                    {isQuoteShown && <ImageQuoteModal />}
                  </Box>
                )}
              </Flex>
            </Box>
            <Actions
              textWidth={textWidth}
              actions={allActions}
              active={displayMode}
            />

            <Box
              id="gallery"
              sx={{
                zIndex: 99,
                height: [
                  displayMode === "gallery" ? "45vh" : "auto",
                  "55vh",
                  "calc(100vh - 140px)",
                ],
              }}
            >
              <Box
                ref={mobileHeader}
                sx={{
                  display: ["flex", "flex", "none"],
                  mb: 0,
                  position: "fixed",
                  top: 75,
                  left: 0,
                  pl: "4",
                  pt: 3,
                  pb: 3,
                  width: "calc(100% - 30px)",
                  background: "white",
                  zIndex: 999,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: `wrap`,
                }}
              >
                <Text
                  as="h2"
                  sx={{
                    fontWeight: 600,
                    fontSize: 2,
                  }}
                >
                  <Link
                    to="/"
                    style={{
                      color: "black",
                      textDecoration: "none",
                      textAlign: "left",
                    }}
                  >
                    {sanityProject.title}
                  </Link>
                </Text>
                {displayMode === "indexView" && <ModalOpenBtn variant="text" />}
              </Box>

              {displayMode === "indexView" && (
                <IndexView
                  mt={mobileHeaderHeight - 20}
                  jumpToImage={jumpToImage}
                  images={sanityProject.images}
                />
              )}
              {displayMode === "gallery" && currentImage && (
                <GalleryView
                  mt={mobileHeaderHeight - 20}
                  title={sanityProject.title}
                  index={galleryImage}
                  currentImage={currentImage}
                  increment={() => {
                    paginate(1)
                    setQuoteShow(false)
                  }}
                  decrement={() => {
                    paginate(-1)
                    setQuoteShow(false)
                  }}
                  images={sanityProject.images}
                />
              )}
            </Box>
          </Grid>
        </>
      )}
    </Layout>
  )
}

export const projectData = graphql`
  query ProjectQuery($slug: String) {
    sanityProject(slug: { current: { eq: $slug } }) {
      title
      password
      featuredImage {
        asset {
          gatsbyImageData
        }
      }
      _rawProjectDescription(resolveReferences: { maxDepth: 10 })
      _rawProjectIntro(resolveReferences: { maxDepth: 10 })
      _rawImages(resolveReferences: { maxDepth: 10 })
      images {
        image {
          asset {
            gatsbyImageData
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
