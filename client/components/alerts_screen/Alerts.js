import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import Swipeable from "react-native-swipeable-row";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ALERT, ADD_ALERT, REMOVE_ALERT } from "../queries";
import { Formik } from "formik";
import * as Yup from "yup";

import * as Action from "../../action";
import SYMBOLS from "../helper/SYMBOLS";

const AlertSchema = Yup.object().shape({
  symbol: Yup.string()
    .required("This field is required.")
    .max(6, "Symbol must be less than 6 characters")
    .matches(/^[a-zA-Z]+$/, "Symbol must be letters"),
  price: Yup.string()
    .required("This field is required.")
    .matches(/^[+]?\d+([.]\d+)?$/, "Price must be a positive number")
});

const Alerts = props => {
  const user = props.user;
  const GetAlert = useQuery(GET_ALERT, {
    variables: { id: user.id }
  });

  const [alertData, setAlertData] = useState([]);

  const [addAlertMut] = useMutation(ADD_ALERT);
  const handleAdd = async values => {
    if(SYMBOLS.includes(values.symbol.toUpperCase())){
      const response = await addAlertMut({
        variables: {
          id: user.id,
          symbol: values.symbol.toUpperCase(),
          low_price: parseFloat(values.price)
        }
      });
      Alert.alert("Success!", "Added alert!");
      setAlertData(response.data.add_alert);
    }else{
      Alert.alert("Error!", "Symbol invalid!");
    }
  };

  const [removeAlertMut] = useMutation(REMOVE_ALERT);
  const handleRemove = async (alert_id, id) => {
    const response = await removeAlertMut({
      variables: { alert_id: alert_id, id: id }
    });
    Alert.alert("Success!", "Removed from alerts!");
    setAlertData(response.data.remove_alert);
  };

  useEffect(() => {
    if (!GetAlert.error && !GetAlert.loading) {
      setAlertData(GetAlert.data.alerts);
    }
  }, [GetAlert.loading, GetAlert.data]);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={() => GetAlert.refetch()} />
      {alertData.length == 0 ? (
        <Text />
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              height: 50
            }}
          >
            <Text style={styles.header}>Symbol</Text>
            <Text style={styles.header}>Alert Price</Text>
            <Text style={styles.header}>Created Date</Text>
          </View>
          {alertData.map(d => (
            <Swipeable
              key={d.alert_id}
              rightButtons={[
                <Text
                  style={styles.remove}
                  onPress={() => handleRemove(d.alert_id, user.id)}
                >
                  Remove
                </Text>
              ]}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  // justifyContent: "space-around",
                  alignItems: "center",
                  height: 40
                }}
              >
                <Text style={styles.rowText}>{d.symbol}</Text>
                <Text style={styles.rowText}>{d.low_price}</Text>
                <Text style={styles.createdate}>
                  {d.sys_create_time.substr(0, 10)}
                </Text>
              </View>
            </Swipeable>
          ))}
          <View style={styles.bottomLine} />
        </View>
      )}
      <Formik
        validationSchema={AlertSchema}
        initialValues={{ symbol: "", price: "" }}
        onSubmit={handleAdd}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched
        }) => (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Stock Symbol</Text>
            <Input
              placeholder="AAPL"
              onChangeText={handleChange("symbol")}
              onBlur={handleBlur("symbol")}
              value={values.symbol}
            />
            {errors.symbol && touched.symbol && (
              <Text style={styles.errMsg}>{errors.symbol}</Text>
            )}
            <Text style={{ marginTop: 20 }} />
            <Text style={styles.label}>Alert Price</Text>
            <Input
              placeholder="280.5"
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
              value={values.price}
            />
            {errors.price && touched.price && (
              <Text style={styles.errMsg}>{errors.price}</Text>
            )}
            <Text style={{ marginTop: 20 }} />
            <Button onPress={handleSubmit} title="ADD ALERT" />
          </View>
        )}
      </Formik>
    </View>
  );
};

Alerts.navigationOptions = {
  title: "Alerts"
};

const mapStateToProps = state => ({
  user: state
});

export default connect(mapStateToProps, Action)(Alerts);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginHorizontal: 20,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  addBtn: {
    margin: 50,
    width: 20,
    fontSize: 20,
    color: "white",
    backgroundColor: "#2089dc"
  },
  remove: {
    marginLeft: 20,
    height: 40,
    width: 400,
    backgroundColor: "#2089dc",
    color: "white",
    alignItems: "center",
    paddingLeft: 5,
    paddingTop: 12,
    fontSize: 16,
    fontWeight: "bold"
  },
  header: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  rowText: {
    flex: 0.3,
    fontSize: 18,
    textAlign: "center",
  },
  createdate:{
    fontSize: 18,
    textAlign: "center",
    flex: 0.4
  },
  label: {
    fontSize: 18
  },
  bottomLine: {
    margin: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#C1C0B9"
  },
  errMsg: {
    color: "red"
  }
});
