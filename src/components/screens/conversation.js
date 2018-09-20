import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Message from '../view/message';
import config from '../../config';
import utils from '../../utils';

export default class Conversation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      showActivityIndicator: true
    }
  }

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
    // const query = `?fromUser=${user}`;
    // const url = `${config.baseUrl}api/message${query}`;
    utils.fetchMessages({ fromUser: user })
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          messages: responseJson.data,
          showActivityIndicator: false
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {

    return (
      <View style={styles.container}>
        {this.state.messages.map((message, i) => {
          return <Message {...message} />;
        })}
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});