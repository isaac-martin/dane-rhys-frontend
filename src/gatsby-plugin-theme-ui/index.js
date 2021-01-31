// See other presets to try at https://theme-ui.com/packages/presets
import { base } from "@theme-ui/presets"
export default {
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
  },
}
