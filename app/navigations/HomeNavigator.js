import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DashboardScreen from "../screens/DashboardScreen";
import routes from "../routes/routes";

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={routes.DASHBOARD}
        component={DashboardScreen}
      />
    </Stack.Navigator>
  );
}
