import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import FirebaseContext from "../context/FirebaseContext";
import AuthContext from "../context/AuthContext";

import colors from "../config/colors";
import Screen from "./Screen";
import AppField from "../components/form/AppField";

export default function PaymentScreen() {
  const { firebase } = useContext(FirebaseContext);
  const { userBalance, user } = useContext(AuthContext);

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <Screen>
      <Card style={styles.paymentCard}>
        <Card.Title
          titleStyle={{
            color: colors.primary,
          }}
          title="Card Information"
        />
        <Card.Content>
          <Formik
            validationSchema={Yup.object().shape({
              amount: Yup.string().required().label("Amount"),
              name: Yup.string().required().label("Name"),
              cardNumber: Yup.string().required().min(16).label("Card number"),
              cvv: Yup.string().required().min(3).label("CVV"),
              expiryDate: Yup.string().required().max(7).label("Expiry date"),
            })}
            initialValues={{
              amount: "",
              name: "",
              cardNumber: "",
              cvv: "",
              expiryDate: "",
            }}
            onSubmit={(values) => {
              firebase
                .database()
                .ref(`passengers/${user.nodeId}`)
                .update(
                  {
                    balance: Number(userBalance) + Number(values.amount),
                  },
                  function (error) {
                    if (error) {
                      console.log("error");
                    } else {
                      onToggleSnackBar();
                      console.log("balance updated!");
                    }
                  }
                );
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              setFieldTouched,
              touched,
            }) => {
              return (
                <>
                  <AppField
                    label="Amount (Rs.)"
                    style={{
                      marginBottom: 10,
                      width: "60%",
                    }}
                    keyboardType="number-pad"
                    value={values.amount}
                    onChangeText={handleChange("amount")}
                    onBlur={() => setFieldTouched("amount")}
                    errorVisibility={touched.amount}
                  />
                  <AppField
                    label="Card Holder Name"
                    style={{
                      marginBottom: 10,
                    }}
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={() => setFieldTouched("name")}
                    errorVisibility={touched.name}
                  />
                  <AppField
                    label="Card Number"
                    style={{
                      marginBottom: 10,
                    }}
                    keyboardType="number-pad"
                    maxLength={16}
                    value={values.cardNumber}
                    onChangeText={handleChange("cardNumber")}
                    onBlur={() => setFieldTouched("cardNumber")}
                    errorVisibility={touched.cardNumber}
                  />
                  <AppField
                    label="CVV"
                    style={{
                      marginBottom: 10,
                      width: "60%",
                    }}
                    keyboardType="number-pad"
                    maxLength={3}
                    value={values.cvv}
                    onChangeText={handleChange("cvv")}
                    onBlur={() => setFieldTouched("cvv")}
                    errorVisibility={touched.cvv}
                  />
                  <AppField
                    label="Expiry Date"
                    style={{
                      marginBottom: 10,
                      width: "60%",
                    }}
                    maxLength={7}
                    value={values.expiryDate}
                    onChangeText={handleChange("expiryDate")}
                    onBlur={() => setFieldTouched("expiryDate")}
                    errorVisibility={touched.expiryDate}
                  />
                  <Button
                    onPress={() => {
                      handleSubmit();
                    }}
                    mode="contained"
                    labelStyle={{
                      fontSize: 15,
                    }}
                    style={{
                      marginTop: 10,
                    }}
                  >
                    Pay
                  </Button>
                </>
              );
            }}
          </Formik>
        </Card.Content>
      </Card>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={1100}>
        Amount added to your account balance successfully!
      </Snackbar>
    </Screen>
  );
}

const styles = StyleSheet.create({
  paymentCard: {
    alignSelf: "center",
    width: "90%",
    marginTop: 20,
    backgroundColor: colors.whiteInside,
  },
});
