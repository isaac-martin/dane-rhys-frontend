import React from "react"
import Cookies from "js-cookie"
/** @jsx jsx */
import { jsx } from "theme-ui"
import { Flex, Input, Button, Text } from "theme-ui"
import { GatsbyImage } from "gatsby-plugin-image"

const PasswordProtect = ({ password, onSuccess, title, featuredImage }) => {
  const [showBox, setShowBox] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    const value = e.target.password.value
    if (value === password) {
      Cookies.set(title, password)
      onSuccess()
    } else {
      setShowError(true)
    }
  }

  React.useEffect(() => {
    const hasEnteredPassword = Cookies.get(title) === password
    if (hasEnteredPassword) {
      onSuccess()
    } else {
      setShowBox(true)
    }
  }, [onSuccess, title])

  return (
    <Flex sx={{ flexDirection: "column", maxWidth: "max-content", gap: 4 }}>
      <Text
        as="h1"
        sx={{
          fontWeight: 600,
          fontSize: 4,
        }}
      >
        {title}
      </Text>
      {showBox && (
        <Flex sx={{ flexDirection: "column" }}>
          <Text mb="2">Enter Password</Text>
          <form onSubmit={handleSubmit} sx={{ display: "flex" }}>
            <Input type="text" name="password" sx={{ maxWidth: 200, mr: 1 }} />
            <Button type="submit" variant="black">
              View Project
            </Button>
          </form>
        </Flex>
      )}
      {showError ? (
        <Text as="p" sx={{ color: "red", mt: 1 }}>
          Incorrect Password
        </Text>
      ) : null}
      <Flex
        sx={{
          flexDirection: ["row", "row", "column"],
          margin: "0 auto",
          alignItems: "flex-start",
          gap: 4,
          justifyContent: "flex-start",
        }}
      >
        <GatsbyImage
          image={featuredImage.asset.gatsbyImageData}
          style={{
            maxHeight: "100%",
            width: "100%",
            height: "100%",
            maxWidth: 600,
          }}
          imgStyle={{ objectFit: "contain" }}
        />
      </Flex>
    </Flex>
  )
}

export default PasswordProtect
