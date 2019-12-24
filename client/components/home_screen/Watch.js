import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, RefreshControl } from "react-native"
import { NavigationEvents,withNavigationFocus } from "react-navigation";
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
  // const user = props.user;
  const user = {
    id: 42
  };

  const GetWatch = useQuery(GET_WATCH, {
    variables: { id: user.id },
  });

  const [watchedData, setWatchedData] = useState({});
  const [isWatchedLoading, setIsWatchedLoading] = useState(true);

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
  useEffect(() => {
    if (!GetWatch.error && !GetWatch.loading) {
      if (GetWatch.data.watchlist.length > 0) {
        const watchedSymbols = R.map(x => x.symbol, GetWatch.data.watchlist);
        getWatchedProfiles(watchedSymbols)
      }
    }
  }, [GetWatch.data, GetWatch.error, GetWatch.loading])

  function extractValue(str){
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
            <Touchable onPress={() => handlePressStock(d.symbol, d.profile.companyName)} key={d.symbol}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
          ))}
        </View>
      )}
    </View>
  );
}

//extractValue(d.profile.changesPercentage) > 0 ? styles.stockChangeGreenText : 
Watch.navigationOptions = {
  title: 'Watch',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  stockView: {
    flex: 0.8,
    margin: 10,
  },
  priceView: {
    flex:0.2,
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
    color:'#ff3a30'
  },
  stockChangeGreenText: {
    fontSize: 16,
    color:'#35c759'
  },
});
