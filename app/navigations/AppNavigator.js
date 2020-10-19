import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import routes from "../routes/routes";
import HomeNavigator from "./HomeNavigator";
import JourneyNavigator from "./JourneyNavigator";
import PaymentNavigator from "./PaymentNavigator";
import JourneyHistoryNavigator from "./JourneyHistoryNavigator";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: colors.primary,
          },
          labelStyle: {
            color: colors.secondary,
            fontSize: 13,
          },
          activeTintColor: colors.secondary,
          inactiveTintColor: colors.white,
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons size={size} color={color} name="home" />
              );
            },
          }}
          name={routes.HOME_NAVIGATOR}
          component={HomeNavigator}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons size={size} color={color} name="bus" />
              );
            },
          }}
          name={routes.JOURNEY_NAVIGATOR}
          component={JourneyNavigator}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  size={size}
                  color={color}
                  name="credit-card-wireless"
                />
              );
            },
          }}
          name={routes.PAYMENT_NAVIGATOR}
          component={PaymentNavigator}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  size={size}
                  color={color}
                  name="view-list"
                />
              );
            },
          }}
          name={routes.JOURNEY_HISTORY_NAVIGATOR}
          component={JourneyHistoryNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
