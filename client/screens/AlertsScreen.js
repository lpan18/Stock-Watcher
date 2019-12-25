import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Alerts from "../components/alerts_screen/Alerts";

export default function AlertsScreen(props) {
  return (
    <ScrollView style={styles.container}>
      <Alerts {...props} />
    </ScrollView>
  );
}

AlertsScreen.navigationOptions = {
  title: "Alerts"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
