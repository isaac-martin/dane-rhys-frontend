import React from "react"
import BlockContent from "../components/BlockContent"
import { Grid, Box, Flex, Heading, Text } from "theme-ui"
import Layout from "../components/layout"

import { graphql, Link } from "gatsby"
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
        image={
          socialSharing && socialSharing.image && socialSharing.image.asset.url
        }
        description={
          socialSharing &&
          socialSharing.text &&
          _rawSocialSharing.text[0].children[0].text
        }
      />
      <Grid
        css={{ height: "100%", maxHeight: "100vh" }}
        gap={2}
        columns={[1, "1fr 2fr"]}
      >
        <Box
          sx={{
            maxHeight: `calc(100vh - ${2 * space[4]}px)`,
            order: [2, 0, 0],
          }}
        >
          <Flex
            sx={{
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              <Heading sx={{ display: ["none", "none", "inherit"] }} mb={4}>
                {sanityVideoProject.title}
              </Heading>
            </Link>
            <Box mb={4} sx={{ marginTop: [0, 0, "auto"] }}>
              <BlockContent
                fontFamily="desc"
                blocks={sanityVideoProject._rawProjectDescription}
              />
            </Box>
          </Flex>
        </Box>
        <Box css={{ maxHeight: `calc(100vh - 64px)` }}>
          <Flex
            sx={{
              flexDirection: "column",
              justifyContent: "flexStart",
              height: "100%",
              zIndex: 9999,
            }}
          >
            <Text
              as="h2"
              mb="2"
              sx={{
                fontWeight: 600,
                fontSize: 2,
                display: ["inherit", "inherit", "none"],
              }}
            >
              <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                {sanityVideoProject.title}
              </Link>
            </Text>
            <Box className="video-responsive">
              <iframe
                src={`https://player.vimeo.com/video/${sanityVideoProject.vimeoId}`}
                frameborder="0"
                title="{video_title}"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                allowfullscreen="true"
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
          gatsbyImageData
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
