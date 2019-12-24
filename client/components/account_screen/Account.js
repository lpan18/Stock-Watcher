import React from 'react';
import { SectionList, View, StyleSheet, Text } from 'react-native';
import { Avatar } from "react-native-elements";

function Item({ title }) {
  return (
    <View style={styles.sectionContentContainer}>
      <Text style={styles.sectionContentText}>{title}</Text>
    </View>
  );
}

export default function Account(props) {
  const user = {
    id: 42,
    name: "Test",
    email: "T1@mme.com",
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    sys_create_time: "2019-12-20T22:32:01Z",
    sys_update_time: "2019-12-23T22:32:01Z"
  }
  //props.user;
  const sections = [
    { data: [user.name], title: 'Name' },
    { data: [user.email], title: 'Email' },
    { data: [user.sys_create_time], title: 'Create time' },
    { data: [user.sys_create_time], title: 'Last update time' },
  ];

  return (
    <View>
      <Avatar
        size="large"
        rounded
        source={{
          uri: user.avatar
        }}
        icon={{ name: 'user', type: 'font-awesome' }}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
        containerStyle={{ flex: 2, marginLeft: 20, marginTop: 10, marginBottom: 25 }}
      />

      <SectionList
        style={styles.container}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index}
        sections={sections}
      />
    </View>
  );
}

Account.navigationOptions = {
  title: 'Account',
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: '#fff',
  },
  sectionHeaderContainer: {
    backgroundColor: '#fbfbfb',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ededed',
  },
  sectionHeaderText: {
    fontSize: 20,
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  sectionContentText: {
    color: '#808080',
    fontSize: 16,
    padding: 5,
    marginVertical: 5
  },
  title: {
    fontSize: 18,
  },
});
