import React from "react"
import { ScrollView, StyleSheet, Button} from 'react-native'
import Search from "../components/home_screen/Search"
import Watch from "../components/home_screen/Watch"

export default function HomeScreen(props) {
  return (
    <ScrollView style={styles.container}>
      <Search {...props}/>
      <Watch {...props}/>
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