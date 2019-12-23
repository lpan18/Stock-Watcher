import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text } from "react-native"
import Touchable from 'react-native-platform-touchable'
import * as R from 'ramda'
import { useQuery } from "@apollo/react-hooks"
import { GET_WATCH } from "../queries"

const getNews = async (symbols) => {
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

  const handlePressStock = (symbol, companyName) => {
    console.log(companyName)
    props.navigation.navigate('StockDetails', {
      symbol: symbol,
      companyName: companyName
    })
  }

  return (
    <View>
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
