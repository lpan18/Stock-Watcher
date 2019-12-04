import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLine, VictoryArea, VictoryAxis, VictoryTooltip } from "victory-native";

import { useQuery } from "@apollo/react-hooks"
import moment from 'moment'
import { GET_STOCK_INTRADAY_PRICE, GET_STOCK_DAILY_PRICE } from "../queries"
import ValuesTable from "./ValuesTable"

export default function IntradayPriceChart(props) {
  // console.log("symbol: "+props.symbol+"; range: "+props.range)

  const { loading: loadingIntradayPrice, error: errorIntradayPrice, data: dataIntradayPrice } = useQuery(GET_STOCK_INTRADAY_PRICE, {
    variables: { symbol: "AAPL" }
  });
  let intradayPrices = [];
  let chartData = [];
  // if (!loadingIntradayPrice) {
  //   intradayPrices = dataIntradayPrice.security.stock_price.intraday.prices;
  //   for (let i = 0; i < 5; i++) {
  //     chartData.push(
  //       {
  //         time: intradayPrices[i].datetime,
  //         price: intradayPrices[i].close
  //       }
  //     )
  //   }
  // }
  // console.log(chartData)
  chartData= [
     {
      "date": "16:00:00",
      "price": "259.5200",
    },
     {
      "date": "15:55:00",
      "price": "259.2400",
    },
     {
      "date": "15:50:00",
      "price": "258.8200",
    },
     {
      "date": "15:45:00",
      "price": "258.6610",
    },
     {
      "date": "15:40:00",
      "price": "258.5900",
    },
  ]
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
          <VictoryChart width={350} theme={VictoryTheme.material} scale={{ x: "time" }}>
          <VictoryAxis
              tickFormat={(x) => moment(x).format('h:mm')}
              style={{
                axisLabel: { fontSize: 5 },
                ticks: { stroke: '#ccc' },
                tickLabels: { fontSize: 10, padding: 1, angle:45, verticalAnchor: "middle", textAnchor:'start' },
                grid: { stroke: "#fafafa", strokeWidth: 0.8 }
              }}
            />
            <VictoryAxis dependentAxis
              tickFormat={(y) => y}
              style={{
                grid: { stroke: "#fafafa", strokeWidth: 0.8 },
                tickLabels: { fontSize: 10, padding: 1 },
              }}
            />
            <VictoryLine data={chartData} x="time" y="price" labels={({ datum }) => datum.y}/>
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
