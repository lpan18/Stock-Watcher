import React, { useState } from "react"
import { Button } from "react-native-elements"
import { ScrollView, StyleSheet, View, Text } from "react-native"
import { Table, Rows } from 'react-native-table-component';

import Touchable from 'react-native-platform-touchable';
import * as WebBrowser from 'expo-web-browser';

import { useQuery } from "@apollo/react-hooks"
import { GET_PROFILE, GET_STOCK_INTRADAY_PRICE, GET_STOCK_DAILY_PRICE } from "../queries"

export default function StockDetail(props) {
    const symbol = "AA";//props.navigation.getParam('symbol');
    const [range, setRange] = useState("");
    const handlePressAdd = () => {
        console.log(symbol + "is pressed");
    };

    const { loading: loadingProfile, error: errorProfile, data: dataProfile } = useQuery(GET_PROFILE, {
        variables: { symbol: "AA" }
    });
    const { loading: loadingIntradayPrice, error: errorIntradayPrice, data: dataIntradayPrice } = useQuery(GET_STOCK_INTRADAY_PRICE, {
        variables: { symbol: symbol }
    });

    let intradayPrices = [];
    let tableData = [];
    if (!loadingIntradayPrice) {
        intradayPrices = dataIntradayPrice.security.stock_price.intraday.prices;
        tableData = [
            ['Open', intradayPrices[0].open, 'Close', intradayPrices[0].close,'xxxxxx','xxxxxx','xxxxxx'],
            ['High', intradayPrices[0].high, 'Volume', intradayPrices[0].volume,'xxxxxx','xxxxxx','xxxxxx'],
            ['Low', intradayPrices[0].low, 'Mkt Cap', intradayPrices[0].volume,'xxxxxx','xxxxxx','xxxxxx'],
        ]
    }
    // const { loading:loadingDailyPrice, error:errorDailyPrice, data:dataDailyPrice } = useQuery(GET_STOCK_DAILY_PRICE, {
    //     variables: { symbol: symbol }
    // });

    if (errorProfile) {
        return <Text>Get Profile Error! {errorProfile.message}</Text>;
    }
    if (errorIntradayPrice) {
        return <Text>Get Intraday Stock Price Error! {errorIntradayPrice.message}</Text>;
    }
    // if (errorProfile) {
    //     return <Text>Get Daily Stock Price Error! {errorDailyPrice.message}</Text>;
    // }

    return (
        <ScrollView style={styles.container}>
            {loadingProfile ? <Text /> : (
                <View style={styles.stockView}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.stockTitleText}>{dataProfile.security.symbol}{'    '}
                                <Text style={styles.stockBodyText}>{dataProfile.security.profile.companyName}
                                </Text>
                            </Text>
                        </View>
                        <Button buttonStyle={styles.addBtn} raised onPress={handlePressAdd} title="Watch">Watch</Button>
                        <View style={styles.bottomLine} />
                    </View>
                </View>)}
            {loadingIntradayPrice ? <Text /> : (
                <ScrollView horizontal={true}>
                    <View>
                        <Table borderStyle={{ borderWidth: 0, borderColor: '#C1C0B9' }}>
                            <Rows data={tableData} widthArr={[50,100,100,100,100,100]} style={styles.row} textStyle={styles.text} />
                        </Table>
                    </View>
                </ScrollView>)}
        </ScrollView >
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
    },
    row: { 
        height: 28 
    },
    text: { 
        textAlign: 'center' 
    }
});
