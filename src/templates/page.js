import React from "react"
import BlockContent from "../components/BlockContent"
import { Flex, Box } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PageTemplate = ({ data: { sanityPage } }) => {
  return (
    <Layout showBackBtn>
      <SEO
        title={sanityPage.title}
        image={sanityPage.socialSharing.image.asset.url}
        description={sanityPage._rawSocialSharing.text.children.text}
      />
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
      socialSharing {
        image {
          asset {
            url
          }
        }
      }
      _rawSocialSharing
    }
  }
`

export default PageTemplate
