import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import News from "../components/news_screen/News"

export default function NewsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* <News /> */}
    </ScrollView>
  );
}

NewsScreen.navigationOptions = {
  title: 'News',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
