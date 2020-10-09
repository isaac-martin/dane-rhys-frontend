import React from "react"
import DefaultPage from "../components/page"
import Link from "../components/Link"
import { Heading, Text } from "theme-ui"

const NotFound = () => (
  <DefaultPage title="404">
    <Heading
      as="h2"
      sx={{
        letterSpacing: `0.2em`,
        textTransform: "uppercase",
        fontSize: [5, 5, 6],
        mb: 5,
        mt: 2,
      }}
    >
      Sorry page not found
    </Heading>
    <Text>
      Theres no page at this url.{" "}
      <Link to="/" style={{ color: "black" }}>
        Go Home
      </Link>
    </Text>
  </DefaultPage>
)

export default NotFound
