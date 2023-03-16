import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyAccount from "./MyAccount";
import StripeConnect from "./StripeConnect";

const NativeStack = createNativeStackNavigator();

export default function MyAccountStack() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NativeStack.Screen name="MyAccount" component={MyAccount} />
      <NativeStack.Screen
        name="Browser"
        component={StripeConnect}
        options={{
          presentation: "modal",
        }}
      />
    </NativeStack.Navigator>
  );
}
