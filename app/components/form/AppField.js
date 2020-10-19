import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { TextInput } from "react-native-paper";
import colors from "../../config/colors";

export default function AppField({ label, style, ...props }) {
  return (
    <TextInput
      mode="flat"
      label={label}
      dense={false}
      underlineColor={colors.whiteInside}
      style={[{}, style]}
      {...props}
    />
  );
}
