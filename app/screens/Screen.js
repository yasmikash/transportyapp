import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Constants from "expo-constants";
import colors from "../config/colors";

const deviceHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;

export default function Screen({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: statusBarHeight,
    position: "relative",
  },
});
