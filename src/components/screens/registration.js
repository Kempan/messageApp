import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import config from '../../config';
import Turbo from 'turbo360';

export default class Registration extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        email: '',
        password: ''
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
    this.turbo.createUser(credentials)
      .then(resp => {
        console.log(JSON.stringify(resp));
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  render() {

    return (

      <View style={styles.container}>
        <Text>REGISTRATION</Text>
        <FormInput
          style={styles.input}
          placeholder={'email'}
          value={this.state.email}
          autoCorrect={false}
          spellCheck={false}
          onChangeText={(text) => { this.updateText(text, 'email') }}
        />
        <FormInput
          style={styles.input}
          placeholder={'password'}
          value={this.state.password}
          autoCorrect={false}
          spellCheck={false}
          onChangeText={(text) => { this.updateText(text, 'email') }}
        />
        <Button title='SUBMIT' onPress={() => { }} />
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
  },
  input: {

  }
});
