import { gql } from 'apollo-boost'

export const SIGN_UP = gql`
mutation SignUp($email: String!, $name:String!, $password: String!) {
  signup(email: $email, name:$name, password: $password) {
    jwt
    id
    name
    email
    password
    avatar
    sys_create_time
    sys_update_time
  }
}
`
export const ADD_WATCH = gql`
mutation AddWatch($id: Int!, $symbol:String!) {
  add_watch(id: $id, symbol:$symbol){
    id
    symbol
  }
}
`
export const REMOVE_WATCH = gql`
mutation RemoveWatch($id: Int!, $symbol:String!) {
  remove_watch(id: $id, symbol:$symbol){
    id
    symbol
  }
}
`
export const GET_USER = gql`
query User($email: String!, $password: String!) {
  user(email: $email, password: $password) {
    jwt
    id
    name
    email
    password
    avatar
    sys_create_time
    sys_update_time
  }
}
`
export const GET_WATCH = gql`
query WatchList($id: Int!){
  watchlist(id: $id){
    symbol
  }
}
`
export const GET_NEWS = gql`
query News{
  news {
    source{
      name
    }
    author
    title
    description
    url
    urlToImage
    publishedAt
    content
  }
}
`
export const GET_FOREX = gql`
query Forex{
  exchange {
    ticker
    bid
    ask
    open
    low
    high
    changes
    date
  }
}
`
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

export const GET_STOCK_INTRADAY_H_PRICE = gql`
query Security($symbol: String!) {
    security(symbol: $symbol) {
      stock_price {
        intraday_h{
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
        daily {
        prices {
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

export const GET_KEY_METRICS = gql`
query Security($symbol: String!) {
  security(symbol: $symbol) {
    key_metrics{
      date
      revenue_per_share
      net_income_per_share
      free_cash_flow_per_share
      market_cap
      enterprise_value
      PE_ratio
      PB_ratio
    }
  }
}
`
