import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import QRCode from "react-native-qrcode-generator";

import FirebaseContext from "../context/FirebaseContext";

import AppCard from "../components/AppCard";
import sizes from "../config/sizes";
import colors from "../config/colors";

export default function HomeNavigator({ onPressHandler }) {
  return (
    <AppCard style={styles.container}>
      <Text
        style={{
          fontSize: sizes.medium,
        }}
      >
        To start your journey, point the generated QR code over the scanner at
        the bus.
      </Text>
      <View
        style={{
          alignSelf: "center",
          marginVertical: 20,
        }}
      >
        <QRCode
          value={`val${Math.random()}`}
          size={300}
          bgColor={colors.primary}
          fgColor="white"
        />
      </View>
      <Button
        onPress={onPressHandler}
        mode="outlined"
        labelStyle={{
          fontSize: 20,
        }}
      >
        Scanned
      </Button>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
