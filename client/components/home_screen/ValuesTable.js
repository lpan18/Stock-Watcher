import React from "react"
import { ScrollView, StyleSheet, View, Text } from "react-native"
import { Table, Rows, Row } from 'react-native-table-component';
import { useQuery } from "@apollo/react-hooks"
import { GET_KEY_METRICS } from "../queries"

export default function ValuesTable(props) {
    const latestPrice = props.latestPrice;
    tableData = [
        ['Date', latestPrice.datetime.substr(5), 'High', latestPrice.high],
        ['Open', latestPrice.open, 'Low', latestPrice.low],
        ['Close', latestPrice.close, 'Volume', latestPrice.volume]
    ]

    const { loading, error, data } = useQuery(GET_KEY_METRICS, {
        variables: { symbol: props.symbol },
    });
    if (loading) {
        return <Text>Loading ...</Text>;
    }
    if (error) {
        return <Text>Get Key Metrics Error! {error.message}</Text>;
    }

    const keyMetricsTableHead = ['Metrics', 'Value'];
    const obj = data.security.key_metrics;
    let keyMetricsTableData = null;
    if (obj) {
        Object.keys(obj).map(function (key) {
            return [key, obj[key]];
        });
        keyMetricsTableData.pop();
    }

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 0, borderColor: '#C1C0B9' }}>
                <Rows data={tableData} widthArr={[80, 150, 100, 100]} style={styles.priceRow} textStyle={styles.priceText} />
            </Table>
            {keyMetricsTableData ? (<View>
                <Text style={styles.metricsText}>Key Metrics</Text>
                <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row data={keyMetricsTableHead} style={styles.header} textStyle={styles.headertext} />
                        <Rows data={keyMetricsTableData} style={styles.row} textStyle={styles.text} />
                    </Table>
                </ScrollView></View>) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#fff' },
    priceRow: {
        height: 25
    },
    priceText: {
        marginLeft: 20,
        textAlign: 'left',
        fontSize: 14
    },
    metricsText: {
        marginVertical: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    header: { height: 30, backgroundColor: '#2089dc' },
    headertext: { textAlign: 'center', fontWeight: '400', fontSize: 16, color: 'white' },
    text: { textAlign: 'center', fontWeight: '300', fontSize: 14 },
    dataWrapper: { marginTop: -1, marginHorizontal: 2 },
    row: { height: 25, backgroundColor: 'white' }
});
