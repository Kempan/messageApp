import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Message, MessageShort } from '../view';
import Colors from '../../styles/Colors';
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
    // USER = THE RECIEVER IN CONVERSATION
    const { user } = this.props.navigation.state.params;
    this.props.navigation.setParams({
      currentConversation: user
    });

    //Fetch conversation with user
    utils.fetchMessages('message/me', { fromUser: user })
      .then(responseJson => {
        const sortedMessages = utils.sortedMessages(responseJson.data)
        this.setState({
          messages: sortedMessages,
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

        {this.state.showActivityIndicator ? <ActivityIndicator size='large' /> : null}

        <FlatList
          data={this.state.messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MessageShort
              sentMessage={
                item.fromUser === this.props.navigation.state.params.user
              }
              {...item}
            />
          )}
        />

      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.purple
  }
});