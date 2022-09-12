import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useThemeUI, Grid } from "theme-ui"
import { Link } from "gatsby"
import { getUrl } from "../../utils/getUrl"

const ProjectGrid = ({ items }) => {
  const {
    theme: { space },
  } = useThemeUI()

  return (
    <Grid
      mt={[20, 20, "auto"]}
      gap={16}
      columns={[
        [4, "1fr 1fr 1fr 1fr"],
        [4, "1fr 1fr 1fr 1fr"],
        [(4, "1fr 1fr 1fr 1fr")],
      ]}
      pb={4}
    >
      {items.map(item => {
        return (
          <Link
            target={getUrl(item).isExternal ? "_blank" : ""}
            style={{
              color: `black`,
              textDecoration: `none`,
              fontWeight: `bold`,
            }}
            to={getUrl(item).url}
          >
            <GatsbyImage
              image={item.featuredImage?.asset.gatsbyImageData}
              style={{ width: "100%", marginBottom: space[2] }}
              imgStyle={{ objectFit: "contain" }}
            />
            <p>{item.title}</p>
          </Link>
        )
      })}
    </Grid>
  )
}

export default ProjectGrid
