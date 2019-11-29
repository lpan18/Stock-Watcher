import { gql } from 'apollo-boost'

export const GET_DESCRIPTION = gql`
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

