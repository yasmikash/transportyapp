import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import FirebaseContext from "../context/FirebaseContext";

import AppCard from "../components/AppCard";
import Screen from "./Screen";
import sizes from "../config/sizes";
import colors from "../config/colors";
import JourneyStartQR from "../components/JourneyStartQR";
import OnJourney from "../components/OnJourney";
import JourneyStopped from "../components/JourneyStopped";
import JourneyEnded from "../components/JourneyEnded";

export default function JourneyScreen({ navigation }) {
  const { firebase } = useContext(FirebaseContext);

  const [journeyOnStart, setJourneyOnStart] = useState(true);
  const [onJourney, setOnJoureny] = useState(false);
  const [journeyOnStop, setJourneyOnStop] = useState(false);
  const [journeyOnEnd, setJourneyOnEnd] = useState(false);

  const journeyStart = () => {
    setJourneyOnStart(false);
    setOnJoureny(true);
  };

  return (
    <Screen>
      {journeyOnStart ? <JourneyStartQR onPressHandler={journeyStart} /> : null}
      {onJourney ? (
        <OnJourney
          setJourneyOnStop={() => {
            setOnJoureny(false);
            setJourneyOnStop(true);
          }}
          setJourneyOnEnd={() => {
            setOnJoureny(false);
            setJourneyOnEnd(true);
          }}
        />
      ) : null}
      {journeyOnStop && (
        <JourneyStopped
          navigation={navigation}
          startOnJourney={() => {
            setJourneyOnStop(false);
            setOnJoureny(true);
          }}
        />
      )}
      {journeyOnEnd ? (
        <JourneyEnded
          setJourneyOnStart={() => {
            setJourneyOnEnd(false);
            setJourneyOnStart(true);
          }}
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
