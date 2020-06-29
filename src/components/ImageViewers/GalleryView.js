import React, { useEffect } from "react"
import { Flex, Box } from "theme-ui"
import { useSwipeable } from "react-swipeable"

// @jsx jsx
import { jsx } from "theme-ui"
import BlockContent from "../BlockContent"

import { motion, AnimatePresence } from "framer-motion"
import Img from "gatsby-image"

const variants = {
  enter: () => {
    return {
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    opacity: 1,
  },
  exit: () => {
    return {
      zIndex: 0,
      opacity: 0,
    }
  },
}

const GalleryView = ({ currentImage, increment, decrement, index }) => {
  const arrowListener = ({ key }) => {
    if (key === "ArrowRight") {
      increment()
    }
    if (key === "ArrowLeft") {
      decrement()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", arrowListener)
    return () => {
      document.removeEventListener("keydown", arrowListener)
    }
  })

  const handlers = useSwipeable({
    onSwipedRight: () => decrement(),
    onSwipedLeft: () => increment(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  return (
    <Flex
      css={{
        position: "relative",
        height: `100%`,
      }}
      {...handlers}
    >
      <AnimatePresence custom={index}>
        <motion.div
          style={{
            width: `100%`,
            position: `absolute`,
            display: "flex",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: "column",
          }}
          key={index}
          custom={index}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.5 },
          }}
        >
          <button
            onClick={decrement}
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "50%",
              cursor: "w-resize",
              zIndex: 99,
              background: `none`,
              border: `none`,
              ":focus": {
                outline: `none`,
              },
              outline: "none",
              display: ["none", "inherit", "inherit"],
            }}
          />
          <button
            onClick={increment}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "50%",
              cursor: "e-resize",
              zIndex: 99,
              background: `none`,
              border: `none`,
              ":focus": {
                outline: `none`,
              },
              outline: "none",
              display: ["none", "inherit", "inherit"],
            }}
          />
          <Img
            style={{ maxHeight: "100%", flex: 1 }}
            imgStyle={{ objectFit: "contain" }}
            fluid={currentImage.image.asset.fluid}
          />
          <Box
            // className="noMb"
            sx={{
              // textTransform: "uppercase",
              display: ["inherit", "none", "none"],
            }}
            pb={5}
            pt={1}
          >
            <BlockContent
              fontFamily="desc"
              blocks={currentImage.content.desc}
            />
          </Box>
        </motion.div>
      </AnimatePresence>
    </Flex>
  )
}

export default GalleryView
