import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Table, Rows, Row } from "react-native-table-component";
import { useQuery } from "@apollo/react-hooks";
import { GET_FOREX } from "../queries";
import * as R from "ramda";

export default function Forex() {
  const { loading, error, data } = useQuery(GET_FOREX);
  if (loading) {
    return <Text>Loading ...</Text>;
  }
  if (error) {
    return <Text>Get Forex Rate Error! {error.message}</Text>;
  }

  const tableHead = ["Ticker", "Bid", "Ask", "Changes", "Time(ET)"];
  const sortByTicker = R.sortBy(R.prop("ticker"));
  const tableData = R.map(x => {
    return [x.ticker, x.bid, x.ask, x.changes.toFixed(4), x.date.substr(11)];
  }, sortByTicker(data.exchange));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Exchange Rate (Date : {data.exchange[0].date.substr(0, 10)})
      </Text>
      <Table borderStyle={{ borderWidth: 0, borderColor: "#C1C0B9" }}>
        <Row
          data={tableHead}
          style={styles.header}
          textStyle={styles.headertext}
        />
        <ScrollView style={styles.dataWrapper}>
          <Rows data={tableData} style={styles.row} textStyle={styles.text} />
        </ScrollView>
      </Table>
    </View>
  );
}

Forex.navigationOptions = {
  title: "Forex"
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  title: { fontSize: 20, textAlign: "center", marginBottom: 15 },
  header: { height: 50, backgroundColor: "#4272C3" },
  headertext: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 16,
    color: "white"
  },
  text: { textAlign: "center", fontWeight: "300", fontSize: 14 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#DBE2F3" }
});
