import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";

import { useLazyQuery } from "@apollo/react-hooks";
import { GET_USER } from "../queries";

import * as Action from "../../action";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .required("This field is required.")
    .min(6, "Password is too short")
    .max(15, "Password is too long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter and one number"
    ),
  email: Yup.string()
    .required("This field is required.")
    .email("Invalid email")
});

const SignIn = props => {
  const goTo = path => props.navigation.navigate(path);

  const [getUser, { called, loading, error, data }] = useLazyQuery(GET_USER);

  const LoginUser = values => {
    getUser({
      variables: {
        email: values.email.toLowerCase(),
        password: values.password
      }
    });
    if (called && loading) {
      return <Text>Loading ...</Text>;
    }
    if (error) {
      return <Text>Get User Error! {error.message}</Text>;
    }
    if (data && data.user) {
      props.signedIn(data.user);
      props.navigation.navigate("Main");
    }
  };

  const handleDemo = () => {
    const demoUser = {
      email: "demo@me.com",
      password: "Demo12345"
    };
    LoginUser(demoUser);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Formik
        validationSchema={SignupSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={LoginUser}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched
        }) => (
          <View>
            <Text style={styles.label}>Your Email Address</Text>
            <Input
              placeholder="email@address.com"
              rightIcon={<Icon name="email" size={18} color="black" />}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={styles.errMsg}>{errors.email}</Text>
            )}

            <Text> {"\n"} </Text>
            <Text style={styles.label}>Your Password</Text>
            <Input
              placeholder="Password"
              rightIcon={<Icon name="lock" size={20} color="black" />}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text style={styles.errMsg}>{errors.password}</Text>
            )}

            <Text>
              {" "}
              {"\n"}
              {"\n"}{" "}
            </Text>
            <Button onPress={handleSubmit} title="Sign In" />
          </View>
        )}
      </Formik>
      <View style={styles.btnContainer}>
        <Text style={styles.label}>Don't have an account? </Text>
        <Text style={styles.demo} onPress={() => goTo("SignUp")}>
          Sign Up
        </Text>
        <Text style={styles.label}> or </Text>
        <Text style={styles.demo} onPress={handleDemo}>
          Demo
        </Text>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state
});

export default connect(mapStateToProps, Action)(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40
  },
  title: {
    fontSize: 30,
    marginBottom: 30
  },
  btn: {
    width: 80,
    margin: 10
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
  },
  label: {
    fontSize: 16
  },
  demo: {
    fontSize: 16,
    textDecorationLine: "underline"
  }
});
