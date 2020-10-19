import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";

import FirebaseContext from "../context/FirebaseContext";
import AuthContext from "../context/AuthContext";

import Screen from "./Screen";
import JourenyItem from "../components/JourneyItem";

export default function JourneyHistoryScreen({ navigation }) {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getJourneys();
    });

    return unsubscribe;
  }, [navigation]);

  const [journeys, setJourneys] = useState([]);

  const getJourneys = () => {
    let passengerJourneys = [];
    const journeyRef = firebase.database().ref("journeys");
    journeyRef
      .orderByChild("date")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          if (childData.passengerId === user.user.uid) {
            passengerJourneys.push(childData);
          }
        });

        setJourneys(passengerJourneys.reverse());
      })
      .catch((error) => {
        console.log("error on reading journeys");
      });
  };

  return (
    <Screen>
      <ScrollView
        style={{
          marginBottom: 10,
        }}
      >
        {journeys
          ? journeys.map((journey) => {
              return <JourenyItem journey={journey} />;
            })
          : null}
      </ScrollView>
    </Screen>
  );
}
