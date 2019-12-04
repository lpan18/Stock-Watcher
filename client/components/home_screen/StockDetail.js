import React, { useState } from "react"
import { Button } from "react-native-elements"
import { ScrollView, StyleSheet, View, Text } from "react-native"
import { Table, Rows } from 'react-native-table-component';

// import Touchable from 'react-native-platform-touchable';
// import * as WebBrowser from 'expo-web-browser';

import { useQuery } from "@apollo/react-hooks"
import { GET_PROFILE} from "../queries"
import IntradayPriceChart from "./IntradayPriceChart"

export default function StockDetail(props) {
    const symbol = "AA";//props.navigation.getParam('symbol');
    const [range, setRange] = useState("1D");
    const handlePressAdd = () => {
        console.log(symbol + "is pressed");
    };

    const { loading: loadingProfile, error: errorProfile, data: dataProfile } = useQuery(GET_PROFILE, {
        variables: { symbol: "AA" }
    });

    if (errorProfile) {
        return <Text>Get Profile Error! {errorProfile.message}</Text>;
    }

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
                    </View>
                    <View style={styles.bottomLine} />
                </View>)}
            <View style={styles.bottomLine} />
            <Text style={{height:10}}></Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button buttonStyle={styles.rangeBtn} title="1D">1D</Button>
                <Button buttonStyle={styles.rangeBtn} title="1W">1W</Button>
                <Button buttonStyle={styles.rangeBtn} title="1M">1M</Button>
                <Button buttonStyle={styles.rangeBtn} title="3M">3M</Button>
                <Button buttonStyle={styles.rangeBtn} title="6M">6M</Button>
                <Button buttonStyle={styles.rangeBtn} title="1Y">1Y</Button>
            </View>
            <Text style={{height:10}}></Text>
            <IntradayPriceChart symbol={symbol} range={range} />
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
        height: 40
    },
    rangeBtn: {
        marginLeft:5,
        marginRight:5,
        width: 50,
        height: 40
    },
    bottomLine: {
        borderBottomColor: '#C1C0B9',
        borderBottomWidth: 1,
    },
});
