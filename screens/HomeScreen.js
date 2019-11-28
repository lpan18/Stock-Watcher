import React, { useState } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

export default function HomeScreen() {
  const [searchTxt, setSearchTxt] = useState("");
  const handleSearchButtonClick = (e) => {
    setSearchTxt(e.target.value);
  }
  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search a stock here ..." />
          <Icon name="ios-people" />
        </Item>
        <Button transparent onClick={handleSearchButtonClick}>
          <Text>search</Text>
        </Button>
      </Header>
    </Container>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};
