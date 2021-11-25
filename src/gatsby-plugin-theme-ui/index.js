// See other presets to try at https://theme-ui.com/packages/presets
import { base } from "@theme-ui/presets"
import { buttons } from "polished"
const styles = {
  ...base,
  fonts: {
    ...base.fonts,
    // desc: `"Courier New", Courier, monospace`,
    desc: `Helvetica Neue,Helvetica,Arial,sans-serif`,
    body: `Helvetica Neue,Helvetica,Arial,sans-serif`,
  },
  styles: {
    ...base.styles,
  },
  colors: {
    ...base.colors,
    primary: "#0061c9",
  },
  lineHeights: {
    body: 1.9,
    heading: 1.2,
  },
  textWidth: 350,
  buttons: {
    primary: {
      color: "black",
      bg: "transparent",
      border: "1px solid black",
      borderRadius: "0px",
    },
    clear: {
      bg: `initial`,
      border: `none`,
      padding: "5px",
      cursor: "pointer",
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
    text: {
      color: "black",
      bg: "transparent",
      border: "none",
      p: 0,
    },
    project: {
      fontWeight: "bold",
      color: "black",
      bg: "transparent",
      border: "none",
      p: 0,
    },
    menu: {
      color: "black",
      bg: "transparent",
      border: "none",
      p: 0,
      fontWeight: `bold`,
      letterSpacing: `0.1em`,
      textTransform: `uppercase`,
    },
    menuInversed: {
      color: "white",
      bg: "transparent",
      border: "none",
      p: 0,
      fontWeight: `bold`,
      letterSpacing: `0.1em`,
      textTransform: `uppercase`,
    },
  },
}

export default styles
