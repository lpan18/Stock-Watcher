import React from "react"
import { ScrollView, StyleSheet, Button} from 'react-native'

import Search from "../components/HomeScreen/Search"

export default function HomeScreen(props) {
  return (
    <ScrollView style={styles.container}>
      <Search {...props}/>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  title: 'Home',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});