import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, Alert } from "react-native"
import { Button } from "react-native-elements"
import { NavigationEvents } from "react-navigation";
import Touchable from 'react-native-platform-touchable'
import Swipeable from 'react-native-swipeable-row'
import * as R from 'ramda'
import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_WATCH, REMOVE_WATCH } from "../queries"

const getProfiles = async (symbols) => {
  const requests = symbols.map((symbol) => {
    const url = `https://financialmodelingprep.com/api/v3/company/profile/${symbol}`
    return fetch(url)
      .then(a => {
        return a.json()
      })
      .catch(err => {
        console.log(err)
      })
  })
  return Promise.all(requests)
}

export default function Watch(props) {
  // const user = props.user;
  const user = {
    id: 42
  };

  const GetWatch = useQuery(GET_WATCH, {
    variables: { id: user.id },
  });
  const [watchedData, setWatchedData] = useState({});
  const [isWatchedLoading, setIsWatchedLoading] = useState(true);
  // const [isChanged, setChange] = useState(false);

  const getWatchedProfiles = async (watchedSymbols) => {
    const response = await getProfiles(watchedSymbols);
    setWatchedData(response);
    setIsWatchedLoading(false);
  }

  const handlePressStock = (symbol, companyName) => {
    props.navigation.navigate('StockDetails', {
      symbol: symbol,
      companyName: companyName
    })
  }

  const [removeWatchMut] = useMutation(REMOVE_WATCH);
  const handleRemove = async (id, symbol) => {
    const response = await removeWatchMut({ variables: { id: id, symbol: symbol } });
    Alert.alert('Success!', 'Removed from your watchlist!');
    setWatchedData(response.data.remove_watch);
  }

  useEffect(() => {
    if (!GetWatch.error && !GetWatch.loading) {
      if (GetWatch.data.watchlist.length > 0) {
        const watchedSymbols = R.map(x => x.symbol, GetWatch.data.watchlist);
        getWatchedProfiles(watchedSymbols)
      }
    }
  }, [GetWatch.data, GetWatch.error, GetWatch.loading])

  function extractValue(str) {
    return parseFloat(str.match(/\(([^)]+)\)/)[1])
  }

  return (
    <View>
      <NavigationEvents
        onWillFocus={() => GetWatch.refetch()}
      />
      {isWatchedLoading || watchedData.length == 0 ? <Text /> : (
        <View style={styles.container}>
          <Text style={styles.symbolText}>Watchlist</Text>
          {watchedData.map(d => (
            <Swipeable key={d.symbol} rightButtons={[<Text style={styles.remove} onPress={() => handleRemove(user.id, d.symbol)}>Remove</Text>]}>
              <Touchable onPress={() => handlePressStock(d.symbol, d.profile.companyName)} key={d.symbol}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 50 }}>
                  <View style={styles.stockView}>
                    <Text style={styles.stockTitleText}>{d.symbol}
                    </Text>
                    <Text style={styles.stockBodyText}>{d.profile.companyName}
                    </Text>
                  </View>
                  <View style={styles.priceView}>
                    <Text style={styles.stockTitleText}>{d.profile.price}
                    </Text>
                    <Text style={extractValue(d.profile.changesPercentage) > 0 ? styles.stockChangeGreenText : styles.stockChangeRedText}>
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
}

Watch.navigationOptions = {
  title: 'Watch',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  remove: {
    margin: 10,
    height: 50,
    width: 400,
    backgroundColor: '#2089dc',
    color: 'white',
    alignItems: 'center',
    paddingLeft: 5,
    paddingTop: 17,
    fontSize: 16,
    fontWeight: 'bold'
  },
  stockView: {
    flex: 0.8,
    margin: 10,
  },
  priceView: {
    flex: 0.2,
    margin: 10
  },
  symbolText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  stockTitleText: {
    fontSize: 20,
  },
  stockBodyText: {
    fontSize: 16,
  },
  stockChangeRedText: {
    fontSize: 16,
    color: '#ff3a30'
  },
  stockChangeGreenText: {
    fontSize: 16,
    color: '#35c759'
  },
});
