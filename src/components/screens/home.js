import React from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, StatusBar, Modal, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { Header } from 'react-navigation';
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
      newMessage: {
        toUser: '',
        message: ''
      },
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
        utils.sortedMessages(responseJson.data);
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

  updateNewMessage(text, field) {
    let newMessageObj = Object.assign(this.state.newMessage);
    newMessageObj[field] = text;
    this.setState({
      newMessage: newMessageObj
    });
  }

  createMessage() {
    this.setState({ showMessage: !this.state.showMessage }, () => {
      this.props.navigation.setParams({
        showIcon: !this.state.showMessage
      });
    });
  }

  sendMessage() {
    let params = this.state.newMessage;
    utils.createMessages(params)
      .then(data => {
        this.createMessage();
        this.navigateToConversation(data);
      })
      .catch(err => {
        console.log(err);
      })

  }


  render() {

    return (

      <View style={styles.container}>
        <Modal
          visible={this.state.showMessage}
          animationType='slide'
          transparent={true}
          onRequestClose={() => { this.createMessage() }}
        >

          <View style={styles.modalContainer}>

            <View style={styles.toUserContainer}>

              <Image source={Images.search} style={{ marginHorizontal: 10, height: 30, width: 30 }} />
              <View style={styles.userInputContainer}>
                <TextInput
                  onChangeText={(text) => { this.updateNewMessage(text, 'toUser') }}
                  underlineColorAndroid='transparent'
                  placeholder='Search..'
                />
              </View>

            </View>

            <View style={styles.messagesContainer}>

            </View>

            <View style={styles.createMessageContainer}>

              <Image source={Images.plus} style={styles.icons} />
              <Image source={Images.camera} style={styles.icons} />
              <Image source={Images.gallery} style={styles.icons} />
              <Image source={Images.mic} style={styles.icons} />

              <View style={styles.messageInputContainer}>
                <View style={{ flex: 0.85 }}>
                  <TextInput
                    underlineColorAndroid='transparent'
                    placeholder='Aa'
                    autoFocus={true}
                    multiline={true}
                    onChangeText={(text) => { this.updateNewMessage(text, 'message') }}
                  />
                </View>
                <TouchableOpacity onPress={() => { this.sendMessage() }} style={{ flex: 0.15 }}>
                  <Image source={Images.happySmiley} style={styles.icons} />
                </TouchableOpacity>
              </View>

              <Image source={Images.thumbUp} style={styles.icons} />

            </View>
          </View>

        </Modal>

        <StatusBar />
        {this.state.showActivityIndicator ? <ActivityIndicator size='large' /> : null}

        <FlatList
          style={{ width: '100%' }}
          data={this.state.messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Message {...item} nav={this.navigateToConversation.bind(this, { ...item })} />}
        />

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple,
    padding: 10
  },
  modalContainer: {
    flex: 1,
    marginTop: Header.HEIGHT,
    flexDirection: 'column',
    alignItems: 'center',
  },
  toUserContainer: {
    width: '100%',
    backgroundColor: Colors.brightGrey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInputContainer: {
    width: 200,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'white',
    marginVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  messagesContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white
  },
  createMessageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: Colors.brightGrey
  },
  messageInputContainer: {
    width: 200,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  icons: {
    height: 25,
    width: 25
  }
});
