import React from "react"
import { Grid, Box } from "theme-ui"
// @jsx jsx
import { jsx } from "theme-ui"

import { GatsbyImage } from "gatsby-plugin-image"

const IndexView = ({ images, jumpToImage, mt }) => {
  return (
    <Grid
      mt={[mt, mt, "auto"]}
      gap={16}
      columns={[[2, "1fr 1fr 1fr"], [3, "1fr 1fr 1fr"], [(3, "1fr 1fr 1fr")]]}
      pb={4}
    >
      {images.map((image, index) => (
        <Box css={{ cursor: "crosshair" }} onClick={() => jumpToImage(index)}>
          <GatsbyImage
            image={image.image.asset.gatsbyImageData}
            imgStyle={{
              objectFit: "contain",
            }}
          />
        </Box>
      ))}
    </Grid>
  )
}

export default IndexView
