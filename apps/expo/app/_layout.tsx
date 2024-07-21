import React from "react";

import * as Linking from "expo-linking";
import { AuthProvider } from "../lib/auth/AuthProvider";
import "../global.css"
import { Stack } from "expo-router";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { Box } from "../components/ui/box";
import ToggleMode from "../components/ToggleMode";
let defaultTheme: "dark" | "light" = "light";


Linking.getInitialURL().then((url: any) => {
  let { queryParams } = Linking.parse(url) as any;
  defaultTheme = queryParams?.iframeMode ?? defaultTheme;
});

// import { useFonts } from "expo-font";
// import {
//   Inter_400Regular,
//   Inter_500Medium,
//   Inter_600SemiBold,
//   Inter_700Bold,
//   Inter_900Black,
// } from "@expo-google-fonts/inter";

type ThemeContextType = {
  colorMode?: "dark" | "light";
  toggleColorMode?: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  colorMode: "light",
  toggleColorMode: () => { },
});

export default function App() {
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(
    defaultTheme
  );



  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      {/* top SafeAreaView */}
      {/* <SafeAreaView
        className={`${colorMode === "light" ? "bg-[#E5E5E5]" : "bg-[#262626]"}`}
      /> */}
      <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
        <AuthProvider>
          <GluestackUIProvider mode={colorMode}>
            {/* bottom SafeAreaView */}
            <Box
              className={`${colorMode === "light" ? "bg-white" : "bg-[#171717]"
                } flex-1 overflow-hidden`}
            >
              <ToggleMode />
              <Stack />
            </Box>
          </GluestackUIProvider>
        </AuthProvider>
      </ThemeContext.Provider>
    </>
  );
}
