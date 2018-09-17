import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

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
  }

  render() {

    return (
      <View><Text>TEST</Text></View>
    )

  }
}

const styles = StyleSheet.create({

});