import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Avatar, Title, Divider, Chip } from "react-native-paper";

import FirebaseContext from "../context/FirebaseContext";
import AuthContext from "../context/AuthContext";

import Screen from "./Screen";
import colors from "../config/colors";
import sizes from "../config/sizes";

export default function HomeNavigator() {
  const { firebase } = useContext(FirebaseContext);
  const { user, setUser, setUserBalance } = useContext(AuthContext);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const balanceRef = firebase.database().ref("passengers");
    balanceRef.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.userId === user.user.uid) {
          setUserBalance(childData.balance);
          const updatedUser = {
            ...user,
            node: childData,
            nodeId: childSnapshot.key,
            ratePerMile: 100,
          };
          setUser(updatedUser);
        }
      });
    });
  };

  return (
    <Screen>
      {user.node && (
        <Card style={styles.userProfile}>
          <Card.Content>
            <Avatar.Image
              source={{ uri: user.node.image }}
              size={100}
              style={{
                alignSelf: "center",
              }}
            />
            <Title
              style={{
                alignSelf: "center",
                color: colors.primary,
              }}
            >{`${user.node.firstName} ${user.node.lastName}`}</Title>

            <Text
              style={{
                alignSelf: "center",
                color: colors.primary,
              }}
            >
              {user.node.email}
            </Text>
            <Divider
              style={{
                marginVertical: 20,
              }}
            />
            <Chip
              icon="coins"
              onPress={() => console.log("Pressed")}
              style={{
                alignSelf: "center",
              }}
            >
              Rs. {user.node.balance}
            </Chip>
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
                NIC:
              </Text>
              <Text
                style={{
                  fontSize: sizes.medium,
                }}
              >
                {user.node.NIC}
              </Text>
            </View>
            <Divider />
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
                Phone Number:
              </Text>
              <Text
                style={{
                  fontSize: sizes.medium,
                }}
              >
                {user.node.phoneNumber}
              </Text>
            </View>
          </Card.Content>
        </Card>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  userProfile: {
    alignSelf: "center",
    backgroundColor: colors.whiteInside,
    width: "90%",
    marginTop: 20,
  },
});
