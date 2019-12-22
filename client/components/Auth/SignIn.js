import React, { useState } from "react"
import { connect } from 'react-redux'
import { StyleSheet, View } from "react-native"
import { Button, Input, Text, Icon } from "react-native-elements"
import { Formik } from "formik"
import * as Yup from "yup"

import { useQuery } from "@apollo/react-hooks"
import { LOGIN } from "../queries"

import * as Action from "../../action";

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .required("This field is required.")
        .min(6, "Password is too short")
        .max(15, 'Password is too long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, "Password must contain at least one uppercase letter, one lowercase letter and one number"),
    email: Yup.string()
        .required("This field is required.")
        .email("Invalid email")
});

const SignIn = function SignIn(props) {
    const goTo = path => props.navigation.navigate(path);
    const [vals, setVals] = useState({
        email: '',
        password: ''
    });
    const [currentUser, setCurrentUser] = useState({
        id: 0,
        email: '',
        password: ''
    });

    const LoginUser = (values) => {
        setVals({
            email: values.email,
            password: values.password
        });
    };
    try {
        const { loading, error, data } = useQuery(LOGIN, {
            variables: vals
        });
        if (loading) return <Text>Loading ...</Text>;

        if (error) {
            return <Text>Get User Error! {error.message}</Text>;
        }
        const { signedIn } = props;

        if (data.login && data.login.email == vals.email) {
            setCurrentUser({
                id: data.login.id,
                email: vals.email,
                password: vals.password
            });
            signedIn(currentUser);
            props.navigation.navigate("Main");
        }
    } catch (e) {
        console.log(e);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <Formik
                validationSchema={SignupSchema}
                initialValues={{ email: "", password: "" }}
                onSubmit={LoginUser}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <Text>Your Email Address</Text>
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
                        <Text>Password</Text>
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
                        <Button onPress={handleSubmit} title="Sign In" />
                    </View>
                )}
            </Formik>
            <View style={styles.btnContainer}>
                <Text>Don't have an account?  </Text>
                <Button buttonStyle={styles.btn} title="Sign Up" onPress={() => goTo("SignUp")} />
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
        height: 40,
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
