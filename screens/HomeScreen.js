import React, { useState, Fragment } from "react";
import { SearchBar, Text } from "react-native-elements";
import { useQuery } from "@apollo/react-hooks";
import { GET_DESCRIPTION } from "../components/queries";

export default function HomeScreen() {
  const [searchTxt, setSearchTxt] = useState("");
  // let shouldSkip = false;
  let maxSymbolLength = 6;
  const updateSearchTxt = searchTxt => {
    if (searchTxt.length <= maxSymbolLength) {
      setSearchTxt(searchTxt);
    }
  };
  // if (searchTxt == "AAPL" || searchTxt == "MSFT") {
  //   shouldSkip = false;
  // }else{
  //   shouldSkip = true;
  // }
  const { loading, error, data } = useQuery(GET_DESCRIPTION, {
    // skip: shouldSkip,
    variables: { symbol: searchTxt }
  });

  if (error) {
    return <Text>Error! {error.message}</Text>;
  }

  return (
    <Fragment>
      <SearchBar
        lightTheme
        placeholder="Search Here..."
        onChangeText={updateSearchTxt}
        value={searchTxt}
        showCancel
      />
      {loading || searchTxt == "" ? <Text /> : (
        <Text h3>{data.security.symbol}   <Text h4>{data.security.profile.companyName} {"\n"} </Text></Text>


        // <Text>Price: {data.security.profile.price} {"\n"}
        // Changes: {data.security.profile.changes} {"\n"}
        // Changes Percentage: {data.security.profile.changesPercentage} {"\n"}
        // {data.security.profile.description}
        // </Text>
      )
      }
    </Fragment>
  );
}

// price: Float
// beta: String
// volAvg: String
// mktCap: String
// lastDiv: String
// range: String
// changes: Float
// changesPercentage: String
// companyName: String
// exchange: String
// industry: String
// website: String
// description: String
// ceo: String
// sector: String
// image: String
