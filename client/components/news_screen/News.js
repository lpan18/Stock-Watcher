import React from "react"
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements'
import Touchable from 'react-native-platform-touchable'
import { useQuery } from "@apollo/react-hooks"
import { GET_NEWS } from "../queries"
import * as WebBrowser from 'expo-web-browser';

export default function News() {
  const { loading, error, data } = useQuery(GET_NEWS);

  if (loading) {
    return <Text>Loading ...</Text>;
  }
  if (error) {
    return <Text>Get News Error! {error.message}</Text>;
  }

  const handlePressArticle = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <View>
      {
        data.news.map((d, i) => (
          <Touchable onPress={() => handlePressArticle(d.url)} key={d.url}>
            <ListItem
              key={i}
              leftAvatar={{
                rounded: false, 
                source: { uri: d.urlToImage },
                size: 'large'
              }}
            title={<Text style={styles.title}>{d.title}</Text>}
              subtitle={<Text style={styles.subtitle}>{d.description}</Text>}
              bottomDivider
            />
          </Touchable>
        ))
      }
    </View>
  );
}

News.navigationOptions = {
  title: 'News',
};

const styles = StyleSheet.create({
  title: {
    fontSize:16
  },
  subtitle: {
    marginTop: 5,
    fontSize:13
  }
});
