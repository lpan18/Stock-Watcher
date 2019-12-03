import React, { useState } from "react"
import { Button } from "react-native-elements"
import { ScrollView,StyleSheet, View, Text } from "react-native"
import Touchable from 'react-native-platform-touchable';
import * as WebBrowser from 'expo-web-browser';

import { useQuery } from "@apollo/react-hooks"
import { GET_DESCRIPTION } from "../queries"

export default function StockDetail(props) {
    const symbol = "AA";//props.navigation.getParam('symbol');
    //   const [searchTxt, setSearchTxt] = useState("");
    //   // let shouldSkip = false;
    //   let maxSymbolLength = 6;
    const handlePressAdd = () => {
        console.log(symbol + "is pressed");
    };
    //   const handlePressStock = () => {
    //     console.log("is pressed");
    //     WebBrowser.openBrowserAsync('http://www.google.com');
    //   }
    //   // if (searchTxt == "AAPL" || searchTxt == "MSFT") {
    //   //   shouldSkip = false;
    //   // }else{
    //   //   shouldSkip = true;
    //   // }
    const { loading, error, data } = useQuery(GET_DESCRIPTION, {
        variables: { symbol: symbol }
    });

    if (error) {
        return <Text>Error! {error.message}</Text>;
    }
    return (
        <ScrollView style={styles.container}>
        <View>
            {loading ? <Text /> : (<View style={styles.stockView}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.stockTitleText}>{data.security.symbol}
                        </Text>
                        <Text style={styles.stockBodyText}>{data.security.profile.companyName}
                        </Text>
                    </View>
                    <View style={styles.bottomLine} />
                    <Button buttonStyle={styles.addBtn} raised onPress={handlePressAdd} title="Watch">Watch</Button>
                </View>
            </View>
            )}
        </View>
        </ScrollView>

    );
}

StockDetail.navigationOptions = {
    title: 'StockDetail',
};

const styles = StyleSheet.create({
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EDEDED',
    },
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
      },    
    stockView: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    },
    stockTitleText: {
        fontSize: 25,
    },
    stockBodyText: {
        fontSize: 15,
    },
    addBtn: {
        width: 70,
    },
    bottomLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
});
