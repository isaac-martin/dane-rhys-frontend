import React from "react"
import BodyClassName from "react-body-classname"
import Layout from "../components/layout"
import MainMenu from "../components/Menu/MainMenu"
import HomeImages from "../components/HomeImages"

import SEO from "../components/seo"
import { Grid, Flex, Heading } from "theme-ui"

const IndexPage = () => (
  <BodyClassName className="lock-body-scroll">
    <Layout>
      <SEO title="Home" />
      <Grid
        css={{ height: "100%", maxHeight: "100vh" }}
        gap={2}
        columns={[2, "1fr 1fr"]}
      >
        <Flex sx={{ flexDirection: "column", alignItems: `center` }}>
          <Heading
            as="h1"
            sx={{
              letterSpacing: `0.2em`,
              textTransform: "uppercase",
              fontSize: 6,
              mb: 5,
              mt: 2,
            }}
          >
            Dane Rhys
          </Heading>
          <MainMenu />
        </Flex>

        <HomeImages />
      </Grid>
    </Layout>
  </BodyClassName>
)

export default IndexPage
