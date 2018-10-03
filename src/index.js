import React from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { Home, Authenticate, Conversation, Profil } from './components/screens/index';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import config from './config';
import Colors from './styles/Colors';

const MessageStack = createStackNavigator({
  home: Home,
  conversation: Conversation
}, {
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.white,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: Colors.purple,
      },
      headerTintColor: 'red'
    }
  })

const MainAppTabs = createBottomTabNavigator({
  Messages: MessageStack,
  Profil: Profil
})

const rootNav = (authBool) => {
  return createSwitchNavigator({
    main: MainAppTabs,
    auth: Authenticate,
  },
    {
      initialRouteName: (authBool) ? 'main' : 'auth',
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
