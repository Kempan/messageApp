import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const MessageShort = props => {

  const profilUri = 'https://lh3.googleusercontent.com/gKeTaztl9x0EgVC0BeGsTrU2rxgRqJZ2SAZmECxChSpGpIMHQitPMCzrlWoN91pvpQgr8-oD4iRhN3EDVHoyLOtnqYY';

  //Changing side of conversation depending on sender of message
  const containerStyle = [styles.container];
  const userContainerStyle = [styles.userContainer];
  const reverseMessageSides = !props.sentMessage ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' };
  const pictureMargin = !props.sentMessage ? { marginRight: 10 } : { marginLeft: 10 };
  containerStyle.push(reverseMessageSides);
  userContainerStyle.push(pictureMargin);

  return (

    <View style={containerStyle}>

      <View style={userContainerStyle}>
        <Image
          source={{ uri: profilUri }}
          style={styles.profilPic}
        />
      </View>


      <View style={styles.messageContainer}>

        <Text style={styles.messageText}>{props.message}</Text>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingRight: 70,
    marginBottom: 10,
  },
  userContainer: {
    alignItems: 'center',
    width: 50,
  },
  messageContainer: {
    borderColor: 'rgb(225,225,225)',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 15,
    maxWidth: 270
  },
  profilPic: {
    height: 50,
    width: 50,
    borderRadius: 150 / 2,
  },
  messageText: {
    fontSize: 12
  }
});

export default MessageShort;