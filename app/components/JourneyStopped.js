import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Title, Button } from "react-native-paper";

import AuthContext from "../context/AuthContext";

import colors from "../config/colors";
import sizes from "../config/sizes";
import AmountBox from "./AmountBox";
import AppCard from "./AppCard";
import routes from "../routes/routes";

export default function JourneyStopped({ navigation, startOnJourney }) {
  const { userBalance } = useContext(AuthContext);

  return (
    <View>
      <AppCard
        style={{
          marginTop: 20,
        }}
      >
        <Title
          style={{
            color: colors.primary,
          }}
        >
          Journey Stopped
        </Title>
        <Text
          style={{
            fontSize: sizes.medium,
          }}
        >
          Please top-up your account in order to continue your journey.
        </Text>
      </AppCard>
      <AmountBox
        title="User Balance"
        amount={userBalance}
        style={{
          marginVertical: 20,
        }}
      />

      <Button
        onPress={() => {
          navigation.navigate(routes.PAYMENT_NAVIGATOR);
        }}
        mode="contained"
        labelStyle={{
          fontSize: 15,
        }}
        style={{
          marginTop: 20,
          width: "90%",
          alignSelf: "center",
        }}
      >
        Top Up Account
      </Button>
      <Button
        icon="arrow-left-circle-outline"
        mode="outlined"
        onPress={startOnJourney}
        style={{
          marginTop: 20,
          width: "90%",
          alignSelf: "center",
        }}
      >
        Back to the Journey
      </Button>
    </View>
  );
}
