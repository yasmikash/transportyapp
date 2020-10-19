import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Title, Text, Button, Card } from "react-native-paper";
import QRCode from "react-native-qrcode-generator";
import moment from "moment";

import AppContext from "../context/AppContext";

import AppCard from "./AppCard";
import sizes from "../config/sizes";
import colors from "../config/colors";

export default function JourneyEnded({ setJourneyOnStart }) {
  const { currentJourney } = useContext(AppContext);
  const [qr, setQr] = useState(true);

  return (
    <>
      {qr ? (
        <AppCard style={styles.container}>
          <Text
            style={{
              fontSize: sizes.medium,
            }}
          >
            To end your journey, point the generated QR code over the scanner
            when you getting off the bus.
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
            onPress={() => setQr(false)}
            mode="outlined"
            labelStyle={{
              fontSize: 20,
            }}
          >
            Scanned
          </Button>
        </AppCard>
      ) : (
        <View style={styles.container}>
          <Card
            style={{
              backgroundColor: colors.whiteInside,
            }}
          >
            <Card.Title
              title="Journey Detail"
              subtitle="Detail for the journey you just made"
              titleStyle={{
                color: colors.primary,
              }}
            />
            <Card.Content>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontSize: sizes.medium,
                    }}
                  >
                    Date
                  </Text>
                  <Text
                    style={{
                      fontSize: sizes.medium,
                    }}
                  >
                    {moment().format("MMMM Do YYYY")}
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
                    }}
                  >
                    Total Charge
                  </Text>
                  <Text
                    style={{
                      fontSize: sizes.medium,
                    }}
                  >
                    Rs. {currentJourney.journey.cost}
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
                    }}
                  >
                    Distance Travelled
                  </Text>
                  <Text
                    style={{
                      fontSize: sizes.medium,
                    }}
                  >
                    {currentJourney.journey.miles} km
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
                    }}
                  >
                    Starting Point
                  </Text>
                  <Text
                    style={{
                      fontSize: sizes.medium,
                    }}
                  >
                    {currentJourney.routeTaken.startingPoint}
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
                    }}
                  >
                    Destination Point
                  </Text>
                  <Text
                    style={{
                      fontSize: sizes.medium,
                    }}
                  >
                    {currentJourney.routeTaken.destination}
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
                    }}
                  >
                    Route Number
                  </Text>
                  <Text
                    style={{
                      fontSize: sizes.medium,
                    }}
                  >
                    {currentJourney.routeTaken.routeNo}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
          <Button
            onPress={setJourneyOnStart}
            mode="contained"
            labelStyle={{
              fontSize: 15,
            }}
            style={{
              marginTop: 20,
            }}
          >
            Start Another Journey
          </Button>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignSelf: "center",
    width: "90%",
  },
});
