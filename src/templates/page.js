import React, { useState } from "react"
import BlockContent from "../components/BlockContent"
import { Grid, Box } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PageTemplate = ({ data: { sanityPage } }) => {
  return (
    <Layout showBackBtn>
      <SEO title={sanityPage.title} />
      <Grid gap={2} columns={[1, "1fr"]}>
        <Box>
          <BlockContent blocks={sanityPage._rawPageContent} />
        </Box>
      </Grid>
    </Layout>
  )
}

export const pageData = graphql`
  query PageQuery($slug: String) {
    sanityPage(slug: { current: { eq: $slug } }) {
      title
      _rawPageContent
    }
  }
`

export default PageTemplate
