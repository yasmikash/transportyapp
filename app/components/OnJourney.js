import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { Button, Title } from "react-native-paper";
import useSetInterval from "@reacthooks.org/use-set-interval";

import AuthContext from "../context/AuthContext";
import FirebaseContext from "../context/FirebaseContext";
import AppContext from "../context/AppContext";

import sizes from "../config/sizes";
import AppCard from "./AppCard";
import AmountBox from "./AmountBox";
import colors from "../config/colors";

LogBox.ignoreAllLogs();

export default function OnJoureny({ setJourneyOnStop, setJourneyOnEnd }) {
  const { user, userBalance } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const { setCurrentJourney } = useContext(AppContext);

  const [miles, setMiles] = useState(0);
  const [cost, setCost] = useState(0);

  // firebase databse operations
  const updateBalance = (cost) => {
    firebase
      .database()
      .ref(`passengers/${user.nodeId}`)
      .update(
        {
          balance: userBalance - cost,
        },
        function (error) {
          if (error) {
            console.log("error");
          } else {
            console.log("balance updated!");
          }
        }
      );
  };

  const updateJourneyRealTime = (journey) => {
    firebase
      .database()
      .ref(`journeysOnGoing/${user.user.uid}`)
      .update(
        {
          journey,
        },
        function (error) {
          if (error) {
            console.log("error");
          } else {
            console.log("ongoing journey updated!");
          }
        }
      );
  };

  const setJourneyDetail = (
    passengerId,
    routeTaken,
    cost,
    distanceTravelled
  ) => {
    firebase
      .database()
      .ref("journeys/")
      .push(
        {
          passengerId,
          routeTaken,
          cost,
          distanceTravelled,
          date: new Date().getTime(),
        },
        function (error) {
          if (error) {
            console.log("error");
          } else {
            console.log("journey added!");
          }
        }
      );
  };

  useSetInterval(() => {
    // calculate the miles and the cost
    const calculatedMiles = miles + 1;
    const calculatedCost = calculatedMiles * user.ratePerMile;

    // check if the balance exceeds the total cost of the journey
    if (userBalance < calculatedCost) {
      console.log("prev cost", cost);
      console.log("calculated cost", calculatedCost);

      //update the new account balance
      updateBalance(cost);

      // reset the state to initial state, because the journey has ended
      setCost(0);
      setMiles(0);

      // get the locations
      firebase
        .database()
        .ref("/routes")
        .once("value")
        .then((snapshot) => {
          let routes = [];
          snapshot.forEach((item) => {
            routes.push(item);
          });

          const routeIndexTaken = Math.ceil(Math.random() * routes.length);

          const routeTaken = JSON.parse(
            JSON.stringify(routes[routeIndexTaken])
          );

          setJourneyDetail(user.user.uid, routeTaken, cost, miles);

          // update the new account balance
          updateBalance(cost);

          setCurrentJourney({
            routeTaken,
            journey: {
              miles,
              cost,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });

      // enough balance, so mount the JourneyStopped component in parent
      setJourneyOnStop();
    }

    // lift up the states
    setMiles(calculatedMiles);
    setCost(calculatedCost);

    // update the database, realtime
    updateJourneyRealTime({ miles: calculatedMiles, cost: calculatedCost });
  }, 5000);

  const journeyEndHandler = () => {
    // get the locations
    firebase
      .database()
      .ref("/routes")
      .once("value")
      .then((snapshot) => {
        let routes = [];
        snapshot.forEach((item) => {
          routes.push(item);
        });

        const routeIndexTaken = Math.ceil(Math.random() * routes.length);

        const routeTaken = JSON.parse(JSON.stringify(routes[routeIndexTaken]));

        setJourneyDetail(user.user.uid, routeTaken, cost, miles);

        // update the new account balance
        updateBalance(cost);

        setCurrentJourney({
          routeTaken,
          journey: {
            miles,
            cost,
          },
        });

        // mount the JourneyEnded component in parent
        setJourneyOnEnd();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <AmountBox title="Total Cost" amount={cost} />
      <AppCard
        style={{
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: sizes.medium,
          }}
        >
          Journey Started, and your account is being charged per mile you have
          travelled. Please maintain an enough balance in your account to
          fulfill the payment for your journey.
        </Text>
      </AppCard>
      <AppCard
        style={{
          marginTop: 10,
        }}
      >
        <Title
          style={{
            color: colors.primary,
            alignSelf: "center",
          }}
        >
          Travel Information
        </Title>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: sizes.medium,
                fontWeight: "bold",
              }}
            >
              Distance Travelled So Far:
            </Text>
            <Text
              style={{
                fontSize: sizes.medium,
                fontWeight: "bold",
              }}
            >
              {miles} km
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: sizes.medium,
                fontWeight: "bold",
              }}
            >
              Amount Charged:
            </Text>
            <Text
              style={{
                fontSize: sizes.medium,
                fontWeight: "bold",
              }}
            >
              Rs. {cost}
            </Text>
          </View>
        </View>
      </AppCard>
      <Button
        onPress={journeyEndHandler}
        mode="contained"
        labelStyle={{
          fontSize: 20,
        }}
        style={{
          marginTop: 20,
          width: "90%",
          alignSelf: "center",
        }}
      >
        End Journey
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
