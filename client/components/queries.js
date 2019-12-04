import { gql } from 'apollo-boost'

export const GET_PROFILE = gql`
query Security($symbol: String!) {
    security(symbol: $symbol) {
      symbol
      profile {
        price
        beta
        volAvg
        mktCap
        lastDiv
        range
        changes
        changesPercentage
        companyName
        exchange
        industry
        website
        description
        ceo
        sector
        image
      }
    }
  }
`

export const GET_STOCK_INTRADAY_PRICE = gql`
query Security($symbol: String!) {
    security(symbol: $symbol) {
      stock_price {
        intraday{
        prices{
          open
          high
          low
          close
          volume
          datetime
        }
      }
    }
      }
    }
`

export const GET_STOCK_DAILY_PRICE = gql`
query Security($symbol: String!) {
    security(symbol: $symbol) {
      stock_price {
        daily{
        prices{
          open
          high
          low
          close
          volume
          datetime
        }
      }
    }
      }
    }
`
