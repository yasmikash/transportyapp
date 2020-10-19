import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import JourneyScreen from "../screens/JourneyScreen";
import routes from "../routes/routes";

const Stack = createStackNavigator();

export default function JourneyNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={routes.JOURNEY}
        component={JourneyScreen}
      />
    </Stack.Navigator>
  );
}
