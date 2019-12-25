import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Input, Text, Icon } from "react-native-elements"
import { Formik } from "formik"
import * as Yup from "yup"
import { useMutation } from "@apollo/react-hooks"
import { SIGN_UP } from "../queries"

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .required("This field is required.")
    .min(6, "Password is too short")
    .max(15, 'Password is too long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, "Password must contain at least one uppercase letter, one lowercase letter and one number"),
  name: Yup.string()
    .required("This field is required.")
    .max(20, 'Name is too long'),
  email: Yup.string()
    .required("This field is required.")
    .email("Invalid email")
});

export default function SignUp({ navigation }) {
  const goTo = path => {
    navigation.navigate(path);
  };
  const [signUpMut] = useMutation(SIGN_UP);
  const signUp = async (values) => {
    const currentUser = await signUpMut({ variables: values });
    if (user && user.email == values.email) {
      navigation.navigate("Main", {
        user: currentUser
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        validationSchema={SignupSchema}
        initialValues={{ email: "", name: '', password: "" }}
        onSubmit={signUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={styles.label}>Email Address</Text>
            <Input
              placeholder='email@address.com'
              rightIcon={
                <Icon
                  name='email'
                  size={18}
                  color='black'
                />
              }
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email &&
              touched.email && (
                <Text style={styles.errMsg}>{errors.email}</Text>
              )}
            <Text> {"\n"} </Text>
            <Text style={styles.label}>Nick Name</Text>
            <Input
              placeholder='Name'
              rightIcon={
                <Icon
                  name='face'
                  size={20}
                  color='black'
                />
              }
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {errors.name &&
              touched.name && (
                <Text style={styles.errMsg}>{errors.name}</Text>
              )}
            <Text> {"\n"} </Text>
            <Text style={styles.label}>Password</Text>
            <Input
              placeholder='Password'
              rightIcon={
                <Icon
                  name='lock'
                  size={20}
                  color='black'
                />
              }
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password &&
              touched.password && (
                <Text style={styles.errMsg}>{errors.password}</Text>
              )}
            <Text> {"\n"}{"\n"} </Text>
            <Button onPress={handleSubmit} title="Sign Up" />
          </View>
        )}
      </Formik>
      <View style={styles.btnContainer}>
        <Text style={styles.label}>Already have an account?   </Text>
        <Button buttonStyle={styles.btn} title="Sign In" onPress={() => goTo("SignIn")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40
  },
  title: {
    fontSize: 35,
    marginBottom: 40
  },
  label: {
    fontSize: 16,
  },
  btn: {
    width: 80,
  },
  btnContainer: {
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  errMsg: {
    color: "red"
  }
});
