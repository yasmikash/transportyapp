import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Headline } from "react-native-paper";
import colors from "../config/colors";

export default function AmountBox({ title, amount, style }) {
  return (
    <View style={[styles.container, style]}>
      <FontAwesome name="money" size={30} color={colors.whiteInside} />
      <Headline
        style={{
          color: colors.whiteInside,
          marginLeft: 5,
        }}
      >
        {title}: Rs. {amount}
      </Headline>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});
