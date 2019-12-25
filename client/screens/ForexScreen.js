import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Forex from "../components/forex_screen/Forex"

export default function ForexScreen() {
  return (
    <ScrollView style={styles.container}>
      <Forex />
    </ScrollView>
  );
}

ForexScreen.navigationOptions = {
  title: 'Forex',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
