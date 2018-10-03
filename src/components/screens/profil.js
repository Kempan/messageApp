import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { FormInput, Text } from 'react-native-elements';
import { Button } from '../componentBuilds';
import Colors from '../../styles/Colors';
import AppStyle from '../../styles/AppStyle';
import config from '../../config';
import Turbo from 'turbo360';

export default class Profil extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  signOut() {
    return AsyncStorage.removeItem(config.userIdKey)
      .then(resp => {
        this.props.navigation.navigate('auth');
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {

    return (

      <View style={styles.container}>
        <Text h1>PROFIL</Text>
        <Button
          title='Logout'
          onPress={() => this.signOut()}
          buttonStyle={styles.button}
        />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    ...AppStyle.button.standard
  }
});
