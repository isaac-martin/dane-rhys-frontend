// Page used for 404 and home

import React from "react"
import BodyClassName from "react-body-classname"
import Layout from "../components/layout"
import HomeImages from "../components/HomeImages"
import SEO from "../components/seo"
import { Grid, Flex, jsx } from "theme-ui"
// @jsx jsx

const DefaultPage = ({ children, pageTitle }) => (
  <BodyClassName sx={{overflow: ["scroll", "scroll","hidden"]}}>
    <Layout>
      <SEO title={pageTitle} />
      <Grid
        css={{ height: "100%", maxHeight: "100vh" }}
        gap={2}
        columns={["auto", "1fr 1fr"]}
      >
        <Flex sx={{ flexDirection: "column", alignItems: `center` }}>
          {children}
        </Flex>

        <HomeImages />
      </Grid>
    </Layout>
  </BodyClassName>
)

export default DefaultPage
