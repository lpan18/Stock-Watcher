import React, { useState } from "react"
import { SearchBar } from "react-native-elements"
import { StyleSheet, View, Text } from "react-native"
import Touchable from 'react-native-platform-touchable'
import * as WebBrowser from 'expo-web-browser'

import { useQuery } from "@apollo/react-hooks"
import { GET_PROFILE } from "../queries"
// import RNFS from 'react-native-fs'
var RNFS = require('react-native-fs');

// function getAllSymbols(symbolsFilePath){
//   var path = RNFS.DocumentDirectoryPath + symbolsFilePath;
//   console.log(path)
//   RNFS.readFile(path, 'utf8')
//   .then((res)=>{
//     console.log('read file', res);
//   })
//   .catch((err) => {
//     console.log(err.message, err.code);
//   });
// }

export default function Search(props) {
  // const { navigate } = props.navigation;
  const [searchTxt, setSearchTxt] = useState("AAPL");
  // let shouldSkip = false;
  let maxSymbolLength = 6;
  const updateSearchTxt = searchTxt => {
    if (searchTxt.length <= maxSymbolLength) {
      setSearchTxt(searchTxt);
    }
  };
  const symbolsFilePath = '../../resources/symbol.csv';
  // getAllSymbols(symbolsFilePath);

  const handlePressStock = () => {
    props.navigation.navigate('StockDetail',  {
      symbol: searchTxt
    })
  }
  // if (searchTxt == "AAPL" || searchTxt == "MSFT") {
  //   shouldSkip = false;
  // }else{
  //   shouldSkip = true;
  // }
  // const { loading, error, data } = useQuery(GET_PROFILE, {
  //   // skip: shouldSkip,
  //   variables: { symbol: searchTxt }
  // });

  // if (error) {
  //   return <Text>Error! {error.message}</Text>;
  // }

  return (
    <View>
      <SearchBar
        lightTheme
        placeholder="Search Here..."
        onChangeText={updateSearchTxt}
        value={searchTxt}
        showCancel
      />
      {/* {loading || searchTxt == "" ? <Text /> : (
        <View style={styles.stockView}>
        <Text style={styles.symbolText}>Symbols</Text>
        <Touchable onPress={handlePressStock}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.stockView}>
              <Text style={styles.stockTitleText}>{data.security.symbol}
              </Text>
              <Text style={styles.stockBodyText}>{data.security.profile.companyName}
              </Text>
            </View>
            <View style={styles.stockView}>
              <Text style={styles.stockTitleText}>{data.security.profile.price}
              </Text>
              <Text style={styles.stockBodyText}>{data.security.profile.changesPercentage}
              </Text>

            </View>
          </View>
        </Touchable>
        </View>
      )
      } */}
    </View>
  );
}

Search.navigationOptions = {
  title: 'Search',
};

const styles = StyleSheet.create({
  stockView: {
    margin: 10
  },
  symbolText:{
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
