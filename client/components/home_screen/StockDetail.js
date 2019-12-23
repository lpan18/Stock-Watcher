import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { Button } from "react-native-elements"
import { StyleSheet, View, Text, Alert } from "react-native"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_WATCH, ADD_WATCH } from "../queries"

import * as R from 'ramda'
import { get } from 'lodash'

// import Touchable from 'react-native-platform-touchable';
// import * as WebBrowser from 'expo-web-browser';
// import store from "../../store"

import IntradayPriceChart from "./IntradayPriceChart"
import { printBlockString } from "graphql/language/blockString"

const StockDetail = function StockDetail(props) {
    const user = { id: 42 };//props.user;
    const symbol = 'A';//props.navigation.getParam('symbol');
    const companyName = 'Alcoa Corporation';//props.navigation.getParam('companyName');
    const [range, setRange] = useState("1D");
    const [showAdd, setShowAdd] = useState(true);

    const rangeBtns = [
        { id: 1, title: "1D" },
        { id: 2, title: "1W" },
        { id: 3, title: "1M" },
        { id: 4, title: "3M" },
        { id: 5, title: "6M" },
        { id: 6, title: "1Y" }
    ]

    const { loading, error, data } = useQuery(GET_WATCH, {
        variables: { id: user.id }
    });

    const [addWatchMut] = useMutation(ADD_WATCH);

    const handlePressAdd = async () => {
        const res = await addWatchMut({ variables: { id: user.id, symbol: symbol } });
        if (get(res, 'data', 'add_watch', 'symbol')) {
            Alert.alert('Success!', 'Added to your watchlist!');
            setShowAdd(false)
        }
    };

    const handlePressRangeBtn = (title) => {
        setRange(title);
    };

    useEffect(() => {
        if (!error && !loading) {
            const watchedSymbols = R.map(x => x.symbol, data.get_watch);
            if (watchedSymbols.includes(symbol)) {
                setShowAdd(false)
            }
        }
    }, [data, error, loading])

    return (
        <View style={styles.container}>
            <View style={styles.stockView}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.stockTitleText}>{symbol}{'    '}
                            <Text style={styles.stockBodyText}>{companyName}
                            </Text>
                        </Text>
                    </View>
                    {showAdd ?
                        (<Button buttonStyle={styles.addBtn} raised onPress={handlePressAdd} title="ADD" titleStyle={{ fontSize: 15 }}>ADD</Button>) : null}
                </View>
            </View>
            <View style={styles.bottomLine} />
            <Text style={{ height: 10 }}></Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {rangeBtns.map(rangeBtn => {
                    return (
                        <Button
                            buttonStyle={styles.rangeBtn}
                            key={rangeBtn.id}
                            id={rangeBtn.id}
                            title={rangeBtn.title}
                            onPress={() => handlePressRangeBtn(rangeBtn.title)}
                        />
                    );
                })}
            </View>
            <Text style={{ height: 10 }}></Text>
            {/* <IntradayPriceChart symbol={symbol} range={range} /> */}
        </View >
    );
}

StockDetail.navigationOptions = {
    title: 'StockDetail',
};

const mapStateToProps = state => ({
    user: state
});

export default connect(mapStateToProps)(StockDetail)

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
        height: 40,
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
        width: 50,
        height: 35
    },
    rangeBtn: {
        marginLeft: 5,
        marginRight: 5,
        width: 50,
        height: 40
    },
    bottomLine: {
        borderBottomColor: '#C1C0B9',
        borderBottomWidth: 1,
    },
});
