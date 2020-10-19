import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../config/colors";

export default function AppCard({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteInside,
    alignSelf: "center",
    width: "95%",
    padding: 20,
    borderRadius: 10,
  },
});
