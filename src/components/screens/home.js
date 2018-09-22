import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, AsyncStorage, FlatList, StatusBar } from 'react-native';
import { Message, MessageShort } from '../view';
import config from '../../config';
import utils from '../../utils';

export default class Home extends React.Component {

  static navigationOptions = {
    title: 'Messages'
  }

  constructor(props) {
    super(props);

    this.state = {
      showActivityIndicator: true,
      messages: []
    }
  }

  componentDidMount() {

    utils.fetchMessages({})
      .then(responseJson => {
        this.setState({
          messages: responseJson.data,
          showActivityIndicator: false
        });
      })
      .catch(err => {
        console.log(err.message);
        this.setState({
          showActivityIndicator: false
        });
      });
  }

  navigateToConversation(item) {
    console.log(item.fromUser);
    this.props.navigation.navigate('conversation', { user: item.fromUser });
  }

  render() {

    const { messages } = this.state;

    return (

      <View style={styles.container}>

        <StatusBar />
        {this.state.showActivityIndicator ? <ActivityIndicator size='large' /> : null}

        <FlatList
          style={{ width: '100%' }}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Message {...item} nav={this.navigateToConversation.bind(this, { ...item })} />}
        />

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(243,243,243)',
    padding: 10
  },
});
