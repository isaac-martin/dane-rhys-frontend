import React from "react"
/** @jsx jsx */
import { jsx } from "theme-ui"
import { Flex, Input, Button, Text } from "theme-ui"

const PasswordProtect = ({ password, onSuccess }) => {
  const [showError, setShowError] = React.useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    const value = e.target.password.value
    if (value === password) {
      onSuccess()
    } else {
      setShowError(true)
    }
  }

  return (
    <Flex sx={{ flexDirection: "column", maxWidth: "max-content" }}>
      <Flex sx={{ margin: "0 auto", alignItems: "center" }}>
        <form onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <Input type="text" name="password" sx={{ maxWidth: 200, mr: 1 }} />
          <Button type="submit" variant="black">
            View Project
          </Button>
        </form>
      </Flex>
      {showError ? (
        <Text as="p" sx={{ color: "red", mt: 1 }}>
          Incorrect Password
        </Text>
      ) : null}
    </Flex>
  )
}

export default PasswordProtect
