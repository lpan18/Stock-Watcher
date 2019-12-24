import React from 'react'
import { ScrollView, StyleSheet} from 'react-native'
import Account from '../components/account_screen/Account'

export default function AccountScreen(props) {
  return (
    <ScrollView style={styles.container}>
      <Account {...props}/>
    </ScrollView>
  );
}

AccountScreen.navigationOptions = {
  title: 'Account',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});