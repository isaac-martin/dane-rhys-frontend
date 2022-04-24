// Page used for 404 and home

import React from "react"
import BodyClassName from "react-body-classname"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Grid, Flex, jsx } from "theme-ui"
// @jsx jsx

const DefaultPage = ({ children, pageTitle }) => (
  <BodyClassName sx={{overflow: ["scroll", "scroll","scroll"]}}>
    <Layout removeHeight>
      <SEO title={pageTitle} />
        <Flex sx={{ flexDirection: "column", alignItems: `center` }}>
          {children}
        </Flex>
    </Layout>
  </BodyClassName>
)

export default DefaultPage
