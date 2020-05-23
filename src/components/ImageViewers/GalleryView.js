import React from "react"
import { Flex, Box } from "theme-ui"

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
  return (
    <>
      <button
        style={{ position: `absolute`, zIndex: 99 }}
        onClick={() => increment()}
      >
        +
      </button>
      <button
        style={{ position: `absolute`, zIndex: 99, top: 60 }}
        onClick={() => decrement()}
      >
        -
      </button>
      <Flex
        css={{
          position: "relative",
          height: `100%`,
        }}
      >
        <AnimatePresence custom={index}>
          <motion.div
            style={{
              width: `100%`,
              position: `absolute`,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            key={index}
            custom={index}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            // drag="x"
            transition={{
              opacity: { duration: 0.5 },
            }}
            // dragConstraints={{ left: 0, right: 0 }}
            // dragElastic={1}
            // onDragEnd={(e, { offset, velocity }) => {
            //   // console.log("drag")
            //   console.log(offset.x, velocity)
            //   const swipe = swipePower(offset.x, velocity.x)
            //   // console.log(swipe)

            //   if (swipe < -swipeConfidenceThreshold) {
            //     increment()
            //   } else if (swipe > swipeConfidenceThreshold) {
            //     decerement()
            //   }
            // }}
          >
            <Img
              style={{ maxHeight: "100%" }}
              imgStyle={{ objectFit: "contain" }}
              fluid={currentImage.image.asset.fluid}
            />
          </motion.div>
        </AnimatePresence>
      </Flex>
    </>
  )
}

const swipeConfidenceThreshold = 100
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

export default GalleryView
