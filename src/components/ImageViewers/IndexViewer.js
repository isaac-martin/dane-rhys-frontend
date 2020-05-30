import React from "react"
import { Grid, Box } from "theme-ui"
import Img from "gatsby-image"

const IndexView = ({ images, jumpToImage }) => {
  return (
    <Grid gap={16} columns={[3, "1fr 1fr 1fr"]} pb={4}>
      {images.map((image, index) => (
        <Box onClick={() => jumpToImage(index)}>
          <Img fluid={image.image.asset.fluid} />
        </Box>
      ))}
    </Grid>
  )
}

export default IndexView
