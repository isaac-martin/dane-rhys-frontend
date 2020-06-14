import React from "react"
import BlockContent from "../components/BlockContent"
import { Grid, Box, Flex, Heading } from "theme-ui"
import Layout from "../components/layout"

import { graphql } from "gatsby"
import { useThemeUI } from "theme-ui"
import SEO from "../components/seo"

const VideoTemplate = ({ data: { sanityVideoProject } }) => {
  const {
    theme: { space },
  } = useThemeUI()
  const { socialSharing, _rawSocialSharing } = sanityVideoProject
  return (
    <Layout showBackBtn>
      <SEO
        title={sanityVideoProject.title}
        image={socialSharing && socialSharing.image.asset.url}
        description={
          socialSharing && _rawSocialSharing.text[0].children[0].text
        }
      />
      <Grid
        css={{ height: "100%", maxHeight: "100vh" }}
        gap={2}
        columns={[1, "1fr 2fr"]}
      >
        <Box css={{ maxHeight: `calc(100vh - ${2 * space[4]}px)` }}>
          <Flex
            sx={{
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box css={{ marginTop: "auto" }}>
              <Heading mb={4}>{sanityVideoProject.title}</Heading>
              <Box className="noMb" mb={4}>
                <BlockContent
                  fontFamily="desc"
                  blocks={sanityVideoProject._rawProjectDescription}
                />
              </Box>
            </Box>
          </Flex>
        </Box>
        <Box css={{ maxHeight: `calc(100vh - 64px)` }}>
          <Flex
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Box className="video-responsive">
              <iframe
                src={`https://player.vimeo.com/video/${sanityVideoProject.vimeoId}`}
                frameborder="0"
                title="{video_title}"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen
              ></iframe>
            </Box>
          </Flex>
        </Box>
      </Grid>
    </Layout>
  )
}

export const projectData = graphql`
  query VideoQuery($slug: String) {
    sanityVideoProject(slug: { current: { eq: $slug } }) {
      vimeoId
      _rawProjectDescription
      title
      thumbnail {
        asset {
          fluid {
            ...GatsbySanityImageFluid
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

export default VideoTemplate
