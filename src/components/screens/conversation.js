import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from '../../config';

export default class Conversation extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: params.currentConversation || 'Conversation'
    }
  }

  componentDidMount() {

    const { user } = this.props.navigation.state.params;
    this.props.navigation.setParams({
      currentConversation: user
    });

    //Fetch conversation with user
    const query = `?fromUser=${user}`;
    fetch(`${config.baseUrl}api/message${query}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then(responseJson => {
        console.log(responseJson)
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {

    return (
      <View><Text>TEST</Text></View>
    )

  }
}

const styles = StyleSheet.create({

});