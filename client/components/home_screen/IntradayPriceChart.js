import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLine, VictoryArea, VictoryAxis, VictoryTooltip } from "victory-native";

import { useQuery } from "@apollo/react-hooks"
import moment from 'moment'
import 'moment-timezone'
import { GET_STOCK_INTRADAY_PRICE, GET_STOCK_DAILY_PRICE } from "../queries"
import ValuesTable from "./ValuesTable"

export default function IntradayPriceChart(props) {
  // console.log("symbol: "+props.symbol+"; range: "+props.range)
  // const current_date = moment().tz("America/New_York").format("YYYY-MM-DD"); 
  const { loading: loadingIntradayPrice, error: errorIntradayPrice, data: dataIntradayPrice } = useQuery(GET_STOCK_INTRADAY_PRICE, {
    variables: { symbol: "AA" }
  });
  let intradayPrices = [];
  let chartData = [];
  if (!loadingIntradayPrice) {
    intradayPrices = dataIntradayPrice.security.stock_price.intraday.prices;
    // the entries of last 24 hours
    for (let i = 0; i < 78; i++) {
      chartData.push(
        {
          time: moment(intradayPrices[i].datetime).format('h:mm'),
          price: Number(intradayPrices[i].close)
        }
      )
    }
  }
  chartData = chartData.reverse();
  if (errorIntradayPrice) {
    return <Text>Get Intraday Stock Price Error! {errorIntradayPrice.message}</Text>;
  }
  // const { loading:loadingDailyPrice, error:errorDailyPrice, data:dataDailyPrice } = useQuery(GET_STOCK_DAILY_PRICE, {
  //     variables: { symbol: symbol }
  // });

  // if (errorProfile) {
  //     return <Text>Get Daily Stock Price Error! {errorDailyPrice.message}</Text>;
  // }

  return (
    <View style={styles.container}>
      {loadingIntradayPrice ? <Text /> : (
        <View style={{ alignItems: 'center', flex: 1 }}>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryAxis
              fixLabelOverlap={true}
              tickFormat={(x) => x
                // {if (x.split(':')[1] == '00') {
                //   return x
                // };}
              }
              style={{
                tickLabels: { fontSize: 10, padding: 1 },
                // ticks: {
                //   size: ({ tick }) => {
                //     const tickSize =
                //       x.split(':')[1] == '00' === 0 ? 10 : 5;
                //     return tickSize;
                //   },
                //   stroke: "black",
                //   strokeWidth: 1
                // },
              }}
            />
            <VictoryAxis dependentAxis
              tickFormat={(y) => y}
              style={{
                tickLabels: { fontSize: 10, padding: 1 },
              }}
            />
            <VictoryLine data={chartData} x="time" y="price" />
          </VictoryChart>
          {/* <ValuesTable latestPrice={intradayPrices[0]} /> */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});
