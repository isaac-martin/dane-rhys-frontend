import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Flex } from "theme-ui"
import { useThemeUI } from "theme-ui"
import { GatsbyImage } from "gatsby-plugin-image"

const MainMenu = () => {
  const menuImages = useStaticQuery(graphql`
    query MenuImagesQuery {
      sanityMenu(menuTitle: { eq: "Main Menu" }) {
        homeImages {
          asset {
            gatsbyImageData
          }
        }
      }
    }
  `)

  const images = menuImages.sanityMenu.homeImages

  const {
    theme: { space },
  } = useThemeUI()

  const imagesRandom = images.sort(() => Math.random() - 0.5).slice(0, 3)

  return (
    <Box
      pl={5}
      sx={{
        width: "34vh",
        overflow: `hidden`,
        height: `calc(100vh + ${space[4]}px)`,
        transform: `translateY(-${space[4]}px)`,
        flexDirection: `column`,
        boxSizing: `content-box`,
        display: ["none", "block", "block"],
      }}
    >
      <Flex
        css={{
          transform: `translateY(-${space[4]}px)`,
          flexDirection: `column`,
        }}
      >
        {imagesRandom.map(({ asset }) => (
          <GatsbyImage
            image={asset.gatsbyImageData}
            style={{ width: "100%", marginBottom: space[2] }}
            imgStyle={{ objectFit: "contain" }}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default MainMenu
