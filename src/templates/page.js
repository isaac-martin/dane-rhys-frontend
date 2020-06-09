import React from "react"
import BlockContent from "../components/BlockContent"
import { Flex, Box } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PageTemplate = ({ data: { sanityPage } }) => {
  console.log(sanityPage._rawPageContent)
  return (
    <Layout showBackBtn>
      <SEO title={sanityPage.title} />
      <Flex pt={5} pb={4} css={{ justifyContent: "center" }}>
        <Box css={{ maxWidth: "60ch" }}>
          <BlockContent blocks={sanityPage._rawPageContent} />
        </Box>
      </Flex>
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
