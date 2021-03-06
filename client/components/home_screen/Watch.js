import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import Touchable from "react-native-platform-touchable";
import Swipeable from "react-native-swipeable-row";
import * as R from "ramda";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_WATCH, REMOVE_WATCH } from "../queries";
var _ = require('lodash');
const getProfiles = async symbols => {
  const requests = symbols.map(symbol => {
    const url = `https://financialmodelingprep.com/api/v3/company/profile/${symbol}`;
    return fetch(url)
      .then(a => {
        return a.json();
      })
      .catch(err => {
        console.log(err);
      });
  });
  return Promise.all(requests);
};

const Watch = props => {
  const user = props.user;
  const GetWatch = useQuery(GET_WATCH, {
    variables: { id: user.id }
  });

  const [watchedData, setWatchedData] = useState([]);
  const [isWatchedLoading, setIsWatchedLoading] = useState(true);

  const getWatchedProfiles = async watchedSymbols => {
    const response = await getProfiles(watchedSymbols);
    setWatchedData(response);
    setIsWatchedLoading(false);
  };

  const handlePressStock = (symbol, companyName) => {
    props.navigation.navigate("StockDetails", {
      symbol: symbol,
      companyName: companyName
    });
  };

  const [removeWatchMut] = useMutation(REMOVE_WATCH);
  const handleRemove = async (id, symbol) => {
    const response = await removeWatchMut({
      variables: { id: id, symbol: symbol }
    });
    const remainSymbols = R.map(x => x.symbol, response.data.remove_watch);
    getWatchedProfiles(remainSymbols);
    // Alert.alert("Success!", "Removed from your watchlist!");
  };

  useEffect(() => {
    if (!GetWatch.error && !GetWatch.loading) {
      if (GetWatch.data.watchlist.length > 0) {
        const watchedSymbols = R.map(x => x.symbol, GetWatch.data.watchlist);
        getWatchedProfiles(watchedSymbols);
      }
    }
  }, [GetWatch.data, GetWatch.loading]);

  function extractValue(str) {
    return parseFloat(str.match(/\(([^)]+)\)/)[1]);
  }

  return (
    <View>
      <NavigationEvents onWillFocus={() => GetWatch.refetch()} />
      {isWatchedLoading || watchedData.length == 0 ? (
        <Text />
      ) : (
          <View style={styles.container}>
            <Text style={styles.symbolText}>Watchlist</Text>
            {R.filter(x => _.has(x, 'symbol') && _.has(x, 'profile'), watchedData).map(d => (
              <Swipeable
                key={d.symbol}
                rightButtons={[
                  <Text
                    style={styles.remove}
                    onPress={() => handleRemove(user.id, d.symbol)}
                  >
                    Remove
                </Text>
                ]}
              >
                <Touchable
                  onPress={() => handlePressStock(d.symbol, d.profile.companyName)}
                  key={d.symbol}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <View style={styles.stockView}>
                      <Text style={styles.stockTitleText}>{d.symbol}</Text>
                      <Text style={styles.stockBodyText}>
                        {d.profile.companyName}
                      </Text>
                    </View>
                    <View style={styles.priceView}>
                      <Text style={styles.stockTitleText}>{d.profile.price}</Text>
                      <Text
                        style={
                          extractValue(d.profile.changesPercentage) > 0
                            ? styles.stockChangeGreenText
                            : styles.stockChangeRedText
                        }
                      >
                        {d.profile.changesPercentage}
                      </Text>
                    </View>
                  </View>
                </Touchable>
              </Swipeable>
            ))}
          </View>
        )}
    </View>
  );
};

Watch.navigationOptions = {
  title: "Watch"
};

const mapStateToProps = state => ({
  user: state
});

export default connect(mapStateToProps)(Watch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  remove: {
    margin: 10,
    height: 60,
    width: 400,
    backgroundColor: "#2089dc",
    color: "white",
    alignItems: "center",
    paddingLeft: 5,
    paddingTop: 21,
    fontSize: 18,
    fontWeight: "bold"
  },
  stockView: {
    flex: 0.78,
    margin: 10
  },
  priceView: {
    flex: 0.22,
    margin: 10
  },
  symbolText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  stockTitleText: {
    fontSize: 20
  },
  stockBodyText: {
    fontSize: 16
  },
  stockChangeRedText: {
    fontSize: 16,
    color: "#ff3a30"
  },
  stockChangeGreenText: {
    fontSize: 16,
    color: "#35c759"
  }
});
