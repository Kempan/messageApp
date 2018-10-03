import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { FormInput, FormLabel, Text } from 'react-native-elements';
import { Button } from '../componentBuilds';
import config from '../../config';
import Turbo from 'turbo360';
import Colors from '../../styles/Colors';
import AppStyle from '../../styles/AppStyle';

export default class Authenticate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        email: 'hejsan',
        password: 'password'
      }
    }

    this.turbo = Turbo({ site_id: config.turboAppId });

  }

  updateText(text, field) {
    let newCredentials = Object.assign(this.state.credentials);
    newCredentials[field] = text;
    this.setState({
      credentials: newCredentials
    });
  }


  register() {
    this.turbo.createUser(this.state.credentials)
      .then(resp => {
        return AsyncStorage.setItem(config.userIdKey, resp.id);
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  login(cred) {
    this.turbo.login(cred)
      .then(resp => {
        return AsyncStorage.setItem(config.userIdKey, resp.id);
      })
      .then(key => {
        this.props.navigation.navigate('home')
      })
      .catch(err => {
        console.log(err.message);
      })
  }



  render() {

    return (

      <View style={styles.container}>

        <View style={styles.formContainer}>

          <Text h1 style={{ marginBottom: 20, marginLeft: 16, color: 'white' }}>Log in</Text>
          <FormLabel labelStyle={{ color: 'black' }}>EMAIL ADSRESS</FormLabel>
          <FormInput
            containerStyle={styles.input}
            value={this.state.email}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={(text) => { this.updateText(text, 'email') }}
          />
          <FormLabel labelStyle={{ color: 'black' }}>PASSWORD</FormLabel>
          <FormInput
            containerStyle={styles.input}
            value={this.state.password}
            autoCorrect={false}
            spellCheck={false}
            onChangeText={(text) => { this.updateText(text, 'password') }}
          />

        </View>

        <Button
          buttonStyle={styles.button}
          title='LOGIN'
          onPress={() => { this.login(this.state.credentials) }}
        />
        <Button
          buttonStyle={styles.button}
          title='REGISTER'
          onPress={() => { }}
        />

      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    padding: 0,
    margin: 0,
  },
  button: {
    ...AppStyle.button.standard
  }
});
