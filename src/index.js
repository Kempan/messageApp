import React from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { Home, Authenticate } from './components/screens/index';
import { createSwitchNavigator } from 'react-navigation';
import config from './config';

const rootNav = (authBool) => {
  return createSwitchNavigator({
    auth: Authenticate,
    home: Home,
  },
    {
      initialRouteName: (authBool) ? 'home' : 'auth',
    })
}

export default class AppIndex extends React.Component {

  constructor() {
    super();

    this.state = {
      authCheck: false,
      authed: false
    }

  }

  componentDidMount() {
    AsyncStorage.getItem(config.userIdKey)
      .then(key => {
        if (key) {
          this.setState({
            authCheck: true,
            authed: true
          })
        } else {
          this.setState({
            authCheck: true
          })
        }
      })
      .catch(err => {
        this.setState({
          authCheck: true
        })
        console.log(err)
      })
  }

  render() {

    //change home or authenticate
    const Switch = rootNav(this.state.authed);

    return (
      this.state.authCheck ? <Switch /> : <ActivityIndicator size='large' />
    );

  }
}
