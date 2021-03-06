import React, { useState } from "react";
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./navigation/AppNavigator";
import store from "./store";

import { Provider } from "react-redux";

const App = props => {
  const client = new ApolloClient({
    // link: createHttpLink({ uri: "http://192.168.0.34:4000/graphql" }),
    link: createHttpLink({ uri: "http://ec2-34-217-70-10.us-west-2.compute.amazonaws.com:4000/graphql" }),
    cache: new InMemoryCache()
  });

  const [isLoadingComplete, setLoadingComplete] = useState(false);
  // const { sign_in, sign_out } = props;
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <AppLoading
            startAsync={loadResourcesAsync}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading(setLoadingComplete)}
          />
        </ApolloProvider>
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </ApolloProvider>
      </Provider>
    );
  }
};

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([require("./assets/images/splash.png")]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

export default App; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
