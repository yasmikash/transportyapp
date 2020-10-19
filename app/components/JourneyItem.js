import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Divider } from "react-native-paper";
import moment from "moment";

import colors from "../config/colors";
import sizes from "../config/sizes";

export default function JourneyItem({ journey }) {
  return (
    <View>
      <Card style={styles.container}>
        <Card.Content>
          <Text
            style={{
              fontSize: sizes.medium,
              fontStyle: "italic",
            }}
          >
            on{" "}
            {moment(new Date(Number(journey.date))).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}
          </Text>
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
              Cost:
            </Text>
            <Text
              style={{
                fontSize: sizes.medium,
              }}
            >
              Rs. {journey.cost}
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
              Distance Travelled:
            </Text>
            <Text
              style={{
                fontSize: sizes.medium,
              }}
            >
              {journey.distanceTravelled} km
            </Text>
          </View>

          <Divider
            style={{
              marginVertical: 10,
            }}
          />
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
              Starting Point:
            </Text>
            <Text
              style={{
                fontSize: sizes.medium,
              }}
            >
              {journey.routeTaken.startingPoint}
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
              Destination:
            </Text>
            <Text
              style={{
                fontSize: sizes.medium,
              }}
            >
              {journey.routeTaken.destination}
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
              Route Number:
            </Text>
            <Text
              style={{
                fontSize: sizes.medium,
              }}
            >
              {journey.routeTaken.routeNo}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: colors.whiteInsideSecondary,
    marginTop: 10,
  },
});
