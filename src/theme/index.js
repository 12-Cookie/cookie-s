import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

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
  withDefaultColorScheme({
    colorScheme: "blue",
    components: ["Tag", "Button"],
  }),
);

export default theme;
