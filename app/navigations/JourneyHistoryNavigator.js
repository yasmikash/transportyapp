import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "../routes/routes";
import JourneyHistoryScreen from "../screens/JourneyHistoryScreen";

const Stack = createStackNavigator();

export default function JourneyHistoryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={routes.JOURNEY_HISTORY}
        component={JourneyHistoryScreen}
      />
    </Stack.Navigator>
  );
}
