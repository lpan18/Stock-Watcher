import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { VictoryChart, VictoryTheme, VictoryLine, VictoryAxis, VictoryVoronoiContainer } from 'victory-native';
import * as R from 'ramda'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import 'moment-timezone'
import { GET_STOCK_INTRADAY_PRICE, GET_STOCK_INTRADAY_H_PRICE, GET_STOCK_DAILY_PRICE } from '../queries'
import ValuesTable from './ValuesTable'

export default function PriceChart(props) {

  const RANGE_QUERY_MAPPING = {
    // Range, Query, Limit, TickFunction, fixLabelOverlap
    '1D': [GET_STOCK_INTRADAY_PRICE, 'intraday', 78, XTickFunc_1D, false],
    '1W': [GET_STOCK_INTRADAY_H_PRICE, 'intraday_h', 42, XTickFunc_1W, false],
    '1M': [GET_STOCK_DAILY_PRICE, 'daily', 22, XTickFunc_1M_3M, true],
    '3M': [GET_STOCK_DAILY_PRICE, 'daily', 66, XTickFunc_1M_3M, true],
    '6M': [GET_STOCK_DAILY_PRICE, 'daily', 130, XTickFunc_6M_1Y, false],
    '1Y': [GET_STOCK_DAILY_PRICE, 'daily', 260, XTickFunc_6M_1Y, false],
  }

  // const current_date = moment().tz('America/New_York').format('YYYY-MM-DD'); 
  const { loading, error, data } = useQuery(RANGE_QUERY_MAPPING[props.range][0], {
    variables: { symbol: props.symbol }
  });

  if (loading) {
    return <Text>Loading ...</Text>;
  }
  if (error) {
    return <Text>Get Intraday Stock Price Error! {error.message}</Text>;
  }

  let tickDateList = [];
  let prices = [];
  let chartData = [];

  function XTickFunc_1D(x) {
    // const t = moment(x).format('h:mm');
    if (x.split(':')[1] == '00') {
      return x.substring(11,16);
    };
  }

  function XTickFunc_1W(x) {
    if (x.split(' ')[1] == '09:30:00') {
      return x.substring(5,10);
    }
  }

  function XTickFunc_1M_3M(x) {
    return x.substring(5,10);
  }

  function XTickFunc_6M_1Y(x) {
    if (tickDateList.length > 0) {
      if (tickDateList.includes(x)) {
        return moment(x.split('-')[1], 'M').format('MMM');
      }
    }
  }

  function findTickDateList(prices) {
    let currMonth = Number(prices[0].datetime.split('-')[1]);
    let delta = props.range == '6M' ? 6 : 12
    let startMonth = currMonth
    if (props.range == '6M' && currMonth >= 7) {
      startMonth = currMonth - delta
    }
    let revPrices = prices.slice().reverse(); // .reverse() in-place reversing
    for (let i = prices.length - RANGE_QUERY_MAPPING[props.range][2]; i < prices.length; i++) {
      if (revPrices[i].datetime.split('-')[1] == startMonth) {
        tickDateList.push(revPrices[i].datetime);
        startMonth = startMonth + 1;
        if (startMonth > 12) {
          startMonth = startMonth - 12;
        }
      }
    };
  }
  if (!R.isNil(data.security.stock_price[RANGE_QUERY_MAPPING[props.range][1]])) {
    prices = data.security.stock_price[RANGE_QUERY_MAPPING[props.range][1]].prices;
  } else {
    return <Text>Loading ...</Text>;
  }
  if (props.range == '6M' || props.range == '1Y') {
    findTickDateList(prices);
  }

  // the entries of last 24 hours
  const count = RANGE_QUERY_MAPPING[props.range][2];
  chartData = prices.slice(0, count).map(x => {
    return {
      time: x.datetime,
      price: Number(x.close)
    }
  });
  chartData = chartData.reverse();

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <VictoryChart
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => {
                return datum.time + '\n' + datum.price
              }}
            />
          }
        >
          <VictoryAxis
            fixLabelOverlap={RANGE_QUERY_MAPPING[props.range][4]}
            tickFormat={RANGE_QUERY_MAPPING[props.range][3]}
            style={{
              axis: { stroke: 'grey' },
              tickLabels: { fontSize: 12, padding: 1, stroke: 'grey' },
              grid: {
                stroke: x => { if (x.text != undefined) return 'grey' },
                strokeDasharray: '10, 5'
              },
            }}
          />
          <VictoryAxis dependentAxis
            tickFormat={(y) => y}
            style={{
              axis: { stroke: 'grey' },
              tickLabels: { fontSize: 12, padding: 2, stroke: 'grey' },
              grid: {
                stroke: 'grey',
                strokeDasharray: '10, 5'
              },
            }}
          />
          <VictoryLine data={chartData} x='time' y='price'
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid black' }
            }}
          />
        </VictoryChart>
        {/* <ValuesTable latestPrice={prices[0]} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
