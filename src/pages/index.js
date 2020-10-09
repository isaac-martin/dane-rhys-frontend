import React from "react"
import BodyClassName from "react-body-classname"
import Layout from "../components/layout"
import MainMenu from "../components/Menu/MainMenu"
import HomeImages from "../components/HomeImages"
import DefaultPage from "../components/page"

import SEO from "../components/seo"
import { Grid, Flex, Heading } from "theme-ui"

const IndexPage = () => (
  <DefaultPage title="Home Page">
    <Heading
      as="h1"
      sx={{
        letterSpacing: `0.2em`,
        textTransform: "uppercase",
        fontSize: [5, 5, 6],
        mb: 5,
        mt: 2,
      }}
    >
      Dane Rhys
    </Heading>
    <MainMenu />
  </DefaultPage>
)

export default IndexPage
