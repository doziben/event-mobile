import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { LogBox } from "react-native";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./Main";
import AuthContextProvider from "./store/AuthContext";
import CalendarContextProvider from "./store/CalendarContext";
import PendingActionsContextProvider from "./store/PendingActionsContaxt";
import AppNavContextProvider from "./store/AppNavContext";
import * as Linking from "expo-linking";

LogBox.ignoreAllLogs();

export default function App() {
  const queryClient = new QueryClient();
  const appUrl = Linking.createURL("https://yeve.co.uk");

  const [loaded] = useFonts({
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    OpenSansRegular: require("./assets/fonts/OpenSans-Regular.ttf"),
    OpenSansSemiBold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
    OpenSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
    OpenSansItalic: require("./assets/fonts/OpenSans-Italic.ttf"),
  });

  if (!loaded) {
    return null;
  }

  //context hell :)

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        linking={{
          prefixes: [appUrl],
        }}
      >
        <AppNavContextProvider>
          <AuthContextProvider>
            <CalendarContextProvider>
              <PendingActionsContextProvider>
                <Main />
              </PendingActionsContextProvider>
            </CalendarContextProvider>
          </AuthContextProvider>
        </AppNavContextProvider>
      </NavigationContainer>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
