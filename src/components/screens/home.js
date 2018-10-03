import React from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, StatusBar, Modal, TouchableOpacity, Image, Text } from 'react-native';
import { Message } from '../view';
import Colors from '../../styles/Colors';
import utils from '../../utils';
import { Images } from '../../resources/images';

export default class Home extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: 'Messages',
      headerRight: params.showIcon ? (
        <TouchableOpacity onPress={params.createMessage}>
          <Image source={Images.createMessage} style={{ height: 50, width: 50, marginRight: 6 }} />
        </TouchableOpacity>
      ) : null
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      showActivityIndicator: true,
      showMessage: false,
      messages: []
    }

    this.createMessage = this.createMessage.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      createMessage: this.createMessage,
      showIcon: !this.state.showMessage
    });
  }

  componentDidMount() {
    utils.fetchMessages('message', {})
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

  // ITEM.fromUser = Message.fromUser
  navigateToConversation(item) {
    this.props.navigation.navigate('conversation', { user: item.fromUser });
  }

  createMessage() {
    this.setState({ showMessage: !this.state.showMessage }, () => {
      this.props.navigation.setParams({
        showIcon: !this.state.showMessage
      });
    });
  }

  render() {

    const { messages } = this.state;

    return (

      <View style={styles.container}>
        <Modal
          visible={this.state.showMessage}
          transparent={true}
          animationType='slide'
          onRequestClose={() => { this.createMessage() }}
        >
          <View style={styles.modalContainer}>
            <Text>Hej</Text>
          </View>
        </Modal>
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
    backgroundColor: Colors.purple,
    padding: 10
  },
  modalContainer: {
    backgroundColor: 'red',
    marginTop: 50,
    height: '100%',
    width: '100%'
  }
});
