import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultProps,
} from "@chakra-ui/react";

const theme = extendTheme(
  {
    styles: {
      global: () => ({
        body: {
          bg: "",
        },
      }),
    },
  },
  withDefaultProps({
    defaultProps: {
      variant: "outline",
      colorScheme: "blue",
      size: "md",
    },
    components: ["Tag"],
  }),
);

export default theme;
