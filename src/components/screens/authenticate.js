import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import config from '../../config';
import Turbo from 'turbo360';

export default class Authenticate extends React.Component {

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

  componentDidMount() {

    AsyncStorage.getItem(config.userIdKey).then(key => { console.log(key) })

    const credentials = {
      email: 'hejsan',
      password: 'password'
    }

    this.login(credentials)
  }

  updateText(text, field) {
    let newCredentials = Object.assign(this.state.credentials);
    newCredentials[field] = text;
    this.setState({
      credentials: newCredentials
    });
    console.log(this.state.credentials);
  }


  register() {
    this.turbo.createUser(this.state.credentials)
      .then(resp => {
        console.log(JSON.stringify(resp));
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
      .catch(err => {
        console.log(err.message);
      })
  }



  render() {

    return (

      <View style={styles.container}>
        <Text>LOGIN</Text>
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
          onChangeText={(text) => { this.updateText(text, 'password') }}
        />
        <Button title='LOGIN' onPress={() => { }} />
        <Button title='REGISTER' onPress={this.logout} />
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
