import React, { useState } from "react"
import { connect } from 'react-redux'
import { Button } from "react-native-elements"
import { ScrollView, StyleSheet, View, Text } from "react-native"
import { Table, Rows } from 'react-native-table-component'

// import Touchable from 'react-native-platform-touchable';
// import * as WebBrowser from 'expo-web-browser';

import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_PROFILE, ADD_WATCH } from "../queries"
import IntradayPriceChart from "./IntradayPriceChart"

import store from "../../store"

const StockDetail =  function StockDetail(props) {
    const user = {id:42}//props.user;
    const symbol = "AA"//props.navigation.getParam('symbol');
    const [range, setRange] = useState("1D");
    const rangeBtns = [
        { id: 1, title: "1D" },
        { id: 2, title: "1W" },
        { id: 3, title: "1M" },
        { id: 4, title: "3M" },
        { id: 5, title: "6M" },
        { id: 6, title: "1Y" }
    ]

    const [addWatchMut] = useMutation(ADD_WATCH);

    const handlePressAdd = async() => {
        const res = await addWatchMut({ variables: { id: user.id, symbol: symbol}});
        console.log(res.data.add_watch)
    };

    const handlePressRangeBtn = (title) => {
        setRange(title);
    };

    const { loading: loadingProfile, error: errorProfile, data: dataProfile } = useQuery(GET_PROFILE, {
        variables: { symbol: symbol }
    });

    if (loadingProfile) return <Text>Loading ...</Text>;

    if (errorProfile) {
        return <Text>Get Profile Error! {errorProfile.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.stockView}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.stockTitleText}>{dataProfile.security.symbol}{'    '}
                            <Text style={styles.stockBodyText}>{dataProfile.security.profile.companyName}
                            </Text>
                        </Text>
                    </View>
                    <Button buttonStyle={styles.addBtn} raised onPress={handlePressAdd} title="ADD">ADD</Button>
                </View>
                <View style={styles.bottomLine} />
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
