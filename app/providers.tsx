"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.200",
      },
    },
  },
});

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </SessionProvider>
  );
};

export default Providers;
