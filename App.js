import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import AuthContext from "./app/context/AuthContext";
import AppContext from "./app/context/AppContext";
import FirebaseContext from "./app/context/FirebaseContext";

import colors from "./app/config/colors";
import SignInScreen from "./app/screens/SignInScreen";
import firebase from "./app/firebase/firebase";
import AppNavigator from "./app/navigations/AppNavigator";

const appTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    placeholder: colors.white,
  },
};

export default function App() {
  const [user, setUser] = useState();
  const [userBalance, setUserBalance] = useState(0);
  const [currentJourney, setCurrentJourney] = useState();
  const [miles, setMiles] = useState(0);
  const [cost, setCost] = useState(0);

  return (
    <PaperProvider theme={appTheme}>
      <AuthContext.Provider
        value={{
          user,
          userBalance,
          setUser,
          setUserBalance,
        }}
      >
        <AppContext.Provider
          value={{
            currentJourney,
            miles,
            cost,
            setCurrentJourney,
            setMiles,
            setCost,
          }}
        >
          <FirebaseContext.Provider value={{ firebase: firebase }}>
            {!user ? <SignInScreen /> : <AppNavigator />}
          </FirebaseContext.Provider>
        </AppContext.Provider>
      </AuthContext.Provider>
    </PaperProvider>
  );
}
