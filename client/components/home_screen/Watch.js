import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text } from "react-native"
import Touchable from 'react-native-platform-touchable'
import * as R from 'ramda'
import { useQuery } from "@apollo/react-hooks"
import { GET_WATCH } from "../queries"

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
  const user = {
    id: 42
  }; // props.user

  const { loading: loadingWatch, error: errorWatch, data: dataWatch } = useQuery(GET_WATCH, {
    variables: { id: user.id }
  });

  const [watchedData, setWatchedData] = useState({});
  const [isWatchedLoading, setIsWatchedLoading] = useState(true);

  if (loadingWatch) return <Text>Loading ...</Text>;

  if (errorWatch) {
    return <Text>Get WatchList Error! {errorWatch.message}</Text>;
  }
  console.log("render2")
  const watches = dataWatch.get_watch;
  const watchedSymbols = R.map(x => x.symbol, watches);
  if (watchedSymbols.length) {
    getProfiles(watchedSymbols).then(res => {
      setWatchedData(res);
      setIsWatchedLoading(false);
    })
  }

  const handlePressStock = () => {
    // props.navigation.navigate('StockDetail', {
    //   symbol: symbol
    // })
  }

  return (
    <View>
      {isWatchedLoading ? <Text /> : (
        <View style={styles.stockView}>
          <Text style={styles.symbolText}>WatchList</Text>
          {watchedData.map(d => (
            <Touchable onPress={handlePressStock} key={d.symbol}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.stockView}>
                  <Text style={styles.stockTitleText}>{d.symbol}
                  </Text>
                  <Text style={styles.stockBodyText}>{d.profile.companyName}
                  </Text>
                </View>
                <View style={styles.stockView}>
                  <Text style={styles.stockTitleText}>{d.profile.price}
                  </Text>
                  <Text style={styles.stockBodyText}>{d.profile.changesPercentage}
                  </Text>
                </View>
              </View>
            </Touchable>
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
  stockView: {
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
    fontSize: 15,
  },
});
