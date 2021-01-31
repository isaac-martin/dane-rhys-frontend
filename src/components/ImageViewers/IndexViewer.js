import React from "react"
import { Grid, Box } from "theme-ui"
// @jsx jsx
import { jsx } from "theme-ui"

import Img from "gatsby-image"

const IndexView = ({ images, jumpToImage, mt }) => {
  return (
    <Grid
      mt={[mt, "auto", "auto"]}
      gap={16}
      columns={[[2, "1fr 1fr 1fr"], [3, "1fr 1fr 1fr"], [(3, "1fr 1fr 1fr")]]}
      pb={4}
    >
      {images.map((image, index) => (
        <Box css={{ cursor: "crosshair" }} onClick={() => jumpToImage(index)}>
          <Img
            imgStyle={{
              objectFit: "contain",
            }}
            fluid={image.image.asset.fluid}
          />
        </Box>
      ))}
    </Grid>
  )
}

export default IndexView
