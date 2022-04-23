import React from "react"
import BlockContent from "../components/BlockContent"
import { Flex, Box } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PageTemplate = ({ data: { sanityPage } }) => {
  const { socialSharing, _rawSocialSharing } = sanityPage

  return (
    <Layout showBackBtn>
      <SEO
        title={sanityPage.title}
        image={socialSharing && socialSharing.image.asset.url}
        description={
          socialSharing && _rawSocialSharing.text[0].children[0].text
        }
      />
      <Flex pt={5} pb={4} css={{ justifyContent: "center" }}>
        <Box css={{ maxWidth: "70ch" }}>
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
