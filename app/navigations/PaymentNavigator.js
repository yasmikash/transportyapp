import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "../routes/routes";
import PaymentScreen from "../screens/PaymentScreen";

const Stack = createStackNavigator();

export default function PaymentNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={routes.PAYMENT}
        component={PaymentScreen}
      />
    </Stack.Navigator>
  );
}
