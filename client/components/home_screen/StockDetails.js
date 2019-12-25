import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { Button } from "react-native-elements"
import { StyleSheet, View, Text, Alert } from "react-native"
import { useQuery, useMutation } from "@apollo/react-hooks"
import * as R from 'ramda'
import { GET_WATCH, ADD_WATCH } from "../queries"
import PriceChart from "./PriceChart"

const StockDetails = (props) => {
    const user = props.user;
    const symbol = props.navigation.getParam('symbol') || '';
    const companyName = props.navigation.getParam('companyName') || '';
    const [range, setRange] = useState("1W");
    const [showAdd, setShowAdd] = useState(true);
    const [pressed, setPressed] = useState(2);

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
        await addWatchMut({ variables: { id: user.id, symbol: symbol } });
        Alert.alert('Success!', 'Added to your watchlist!');
        setShowAdd(false)
    };

    const handlePressRangeBtn = (title, id) => {
        setRange(title);
        setPressed(id);
    };

    useEffect(() => {
        if (!error && !loading) {
            const watchedSymbols = R.map(x => x.symbol, data.watchlist);
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
                            <Text style={styles.stockBodyText}>{companyName.substr(0, 36)}
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
                            buttonStyle={rangeBtn.id == pressed ? [styles.rangeBtn, { backgroundColor: 'orange' }] : styles.rangeBtn}
                            key={rangeBtn.id}
                            id={rangeBtn.id}
                            title={rangeBtn.title}
                            onPress={() => handlePressRangeBtn(rangeBtn.title, rangeBtn.id)}
                        />
                    );
                })}
            </View>
            <Text style={{ height: 10 }}></Text>
            <PriceChart symbol={symbol} range={range} />
        </View >
    );
}

StockDetails.navigationOptions = {
    title: 'StockDetails',
};

const mapStateToProps = state => ({
    user: state
});

export default connect(mapStateToProps)(StockDetails)

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
        height: 40,
    },
    bottomLine: {
        borderBottomColor: '#C1C0B9',
        borderBottomWidth: 1,
    },
});
