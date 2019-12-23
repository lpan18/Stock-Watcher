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

  const { loading, error, data } = useQuery(GET_WATCH, {
    variables: { id: user.id }
  });

  const [watchedData, setWatchedData] = useState({});
  const [isWatchedLoading, setIsWatchedLoading] = useState(true);


  const getWatchedProfiles = async (watchedSymbols) => {
    const response = await getProfiles(watchedSymbols);
    setWatchedData(response);
    setIsWatchedLoading(false);
  }

  const handlePressStock = (symbol) => {
    console.log(symbol)
    props.navigation.navigate('StockDetail', {
      symbol: symbol
    })
  }

  useEffect(() => {
    if (!error && !loading) {
      const watches = data.get_watch;
      const watchedSymbols = R.map(x => x.symbol, watches);
      getWatchedProfiles(watchedSymbols)
    }
  }, [data, error, loading])

  return (
    <View>
      {isWatchedLoading ? <Text /> : (
        <View style={styles.stockView}>
          <Text style={styles.symbolText}>WatchList</Text>
          {watchedData.map(d => (
            <Touchable onPress={() => handlePressStock(d.symbol)} key={d.symbol}>
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
