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
  add_watch(id: $id, symbol:$symbol)
}
`
export const LOGIN = gql`
query Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
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
