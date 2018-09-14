import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { Message } from '../view';
import config from '../../config';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showActivityIndicator: true,
      messages: []
    }
  }

  componentDidMount() {

    AsyncStorage.getItem(config.userIdKey)
      .then(key => {
        const query = `?toUser=${key}`;
        return fetch(`${config.baseUrl}api/message${query}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json'
          }
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            this.setState({
              messages: responseJson.data,
              showActivityIndicator: false
            })
          })
          .catch(err => {
            console.log(err.message);
            this.setState({
              showActivityIndicator: false
            })
          })
      })
  }

  render() {

    const { messages } = this.state;
    const lastIndex = messages.length - 1;

    return (

      <View style={styles.container}>

        {this.state.showActivityIndicator ? <ActivityIndicator size='large' /> : null}

        {messages.map((message, i) => {

          const last = i === lastIndex;
          return <Message last={last} {...message} />

        })}

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
