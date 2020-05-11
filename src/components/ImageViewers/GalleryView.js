import React, { useState } from "react"
import Img from "gatsby-image"

const GaleryView = ({ currentImage }) => {
  console.log(currentImage)
  return <Img fluid={currentImage.image.asset.fluid} />
  return <></>
}

export default GaleryView
