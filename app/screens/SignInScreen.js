import React, { useContext, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { Title, Headline, Text, Button } from "react-native-paper";

import AuthContext from "../context/AuthContext";
import FirebaseContext from "../context/FirebaseContext";

import AppCard from "../components/AppCard";
import AppField from "../components/form/AppField";
import sizes from "../config/sizes";
import Screen from "./Screen";
import { Formik } from "formik";
import * as Yup from "yup";
import colors from "../config/colors";

export default function SignInScreen() {
  const { firebase } = useContext(FirebaseContext);
  const { setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const signUserIn = async (email, password) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      setUser(user);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Screen>
      <ImageBackground
        source={require("../../assets/auth_background.jpg")}
        style={styles.imageBackground}
        blurRadius={2}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.imageLogo}
          />
          <Title
            style={{
              fontSize: sizes.xlarge,
              marginBottom: 10,
              color: colors.primary,
            }}
          >
            Sign In.
          </Title>
          <AppCard
            style={{
              elevation: 12,
            }}
          >
            <Text
              style={{
                fontSize: sizes.medium,
                marginBottom: 10,
              }}
            >
              Sign in to your account to start your journey.
            </Text>

            <Formik
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required().label("email"),
                password: Yup.string().required().label("Password"),
              })}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={async (values) => {
                setLoading(true);
                await signUserIn(values.email, values.password);
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
                      label="Email"
                      style={{
                        marginBottom: 10,
                      }}
                      value={values.email}
                      keyboardType="email-address"
                      onChangeText={handleChange("email")}
                      onBlur={() => setFieldTouched("email")}
                      errorVisibility={touched.email}
                    />

                    <AppField
                      label="Password"
                      secureTextEntry={true}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={() => setFieldTouched("password")}
                      errorVisibility={touched.password}
                    />

                    <Button
                      onPress={() => {
                        handleSubmit();
                      }}
                      loading={loading}
                      disabled={loading}
                      mode="contained"
                      labelStyle={{
                        fontSize: 15,
                      }}
                      style={{
                        marginTop: 20,
                      }}
                    >
                      Sign In
                    </Button>
                  </>
                );
              }}
            </Formik>
          </AppCard>
        </View>
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  imageLogo: {
    width: 200,
    height: 90,
    alignSelf: "center",
    marginBottom: 30,
  },
  container: {
    paddingHorizontal: 10,
    justifyContent: "center",
    flex: 1,
  },
});
