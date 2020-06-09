// See other presets to try at https://theme-ui.com/packages/presets
import { base } from "@theme-ui/presets"
export default {
  ...base,
  fonts: {
    ...base.fonts,
    desc: `"Courier New", Courier, monospace`,
    body: `Helvetica Neue,Helvetica,Arial,sans-serif`,
  },
  styles: {
    ...base.styles,
  },
  colors: {
    ...base.colors,
    primary: "#0061c9",
  },
}
