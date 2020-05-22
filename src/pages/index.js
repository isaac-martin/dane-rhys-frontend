import React from "react"
import Layout from "../components/layout"
import MainMenu from "../components/Menu/MainMenu"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Dane Rhys</h1>
    <MainMenu />
  </Layout>
)

export default IndexPage
