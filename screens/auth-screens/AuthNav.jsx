import React, { useCallback, useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import OTPScreen from "./OTPScreen";
import { AuthContext } from "../../store/AuthContext";
import useCurrentUser from "../../hooks/queries/useCurrentUser";
import { ActivityIndicator, View } from "react-native";
import ForgotPassword from "./ForgotPassword";
import LoadingComp from "../../components/Interface/LoadingComp";

const Stack = createNativeStackNavigator();

export default function AuthNav() {
  const authCtx = useContext(AuthContext);
  const { signIn } = authCtx;
  const { isLoading, getUser } = useCurrentUser((user) =>
    signIn(user.userType)
  );

  //Getting the current user on app load
  useEffect(() => {
    getUser();
  }, [authCtx]);

  return (
    <>
      {isLoading ? (
        <LoadingComp />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      )}
    </>
  );
}
