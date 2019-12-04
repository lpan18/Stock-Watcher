import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Table, Rows } from 'react-native-table-component';

export default function ValuesTable(props) {
    const latestPrice = props.latestPrice;
    tableData = [
        ['Open', latestPrice.open, 'Close', latestPrice.close, 'xxxxxx', 'xxxxxx', 'xxxxxx'],
        ['High', latestPrice.high, 'Volume', latestPrice.volume, 'xxxxxx', 'xxxxxx', 'xxxxxx'],
        ['Low', latestPrice.low, 'Mkt Cap', latestPrice.volume, 'xxxxxx', 'xxxxxx', 'xxxxxx']
    ]

    return (
        <ScrollView horizontal={true}>
            <View>
                <Table borderStyle={{ borderWidth: 0, borderColor: '#C1C0B9' }}>
                    <Rows data={tableData} widthArr={[50, 100, 100, 100, 100, 100]} style={styles.row} textStyle={styles.text} />
                </Table>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    row: {
        height: 28
    },
    text: {
        textAlign: 'center'
    }
});
