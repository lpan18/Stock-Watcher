import React, { useState, useEffect } from "react"
import { SearchBar } from "react-native-elements"
import { StyleSheet, View, Text } from "react-native"
import Touchable from 'react-native-platform-touchable'
import * as R from 'ramda'
import SYMBOLS from '../../resources/SYMBOLS'

const getMatchedSymbols = (symbols, searchTxt) => {
  return R.filter(x => x.startsWith(searchTxt), symbols);
};

const getProfiles = async (symbols) => {
  const requests = symbols.map((symbol) => {
    const url = `https://financialmodelingprep.com/api/v3/company/profile/${symbol}`
    return fetch(url)
      .then(a => {
        return a.json()
      })
  })
  return Promise.all(requests)
}

export default function Search(props) {
  const [searchTxt, setSearchTxt] = useState("");

  const [matchedSymbols, setMatchedSymbols] = useState([]);
  const [matchedData, setMatchedData] = useState([]);
  const [isMatchedLoading, setIsMatchedLoading] = useState(true);

  let maxSymbolLength = 6;
  const updateSearchTxt = searchTxt => {
    setSearchTxt(searchTxt);
    if (!searchTxt) {
      setMatchedSymbols([])
    } else if (searchTxt.length <= maxSymbolLength) {
      setMatchedSymbols(getMatchedSymbols(SYMBOLS, searchTxt).slice(0, 1)); // slice to 2 to reduce api call, for dev purpose  
    };
  }

  const handlePressStock = (symbol, companyName) => {
    console.log(symbol+':'+companyName)
    props.navigation.navigate('StockDetails', {
      symbol: symbol,
      companyName: companyName
    })
  }
  useEffect(() => {
    if (matchedSymbols.length == 0) {
      setMatchedData([]);
      setIsMatchedLoading(false);
    } else {
      getProfiles(matchedSymbols).then(res => {
        setMatchedData(res);
        setIsMatchedLoading(false);
      })
    }
  }, [matchedSymbols]);

  return (
    <View>
      <SearchBar
        lightTheme
        placeholder="Search Here..."
        onChangeText={updateSearchTxt}
        value={searchTxt}
        showCancel
      />
      {isMatchedLoading || matchedData.length == 0 ? <Text /> : (
        <View style={styles.stockView}>
          <Text style={styles.symbolText}>Symbols</Text>
          {matchedData.map(d => (
            <Touchable onPress={() => handlePressStock(d.symbol, d.profile.companyName)} key={d.symbol}>
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

Search.navigationOptions = {
  title: 'Search',
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
