import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const MessageShort = props => {

  const profilUri = 'https://lh3.googleusercontent.com/gKeTaztl9x0EgVC0BeGsTrU2rxgRqJZ2SAZmECxChSpGpIMHQitPMCzrlWoN91pvpQgr8-oD4iRhN3EDVHoyLOtnqYY';

  return (

    <View style={styles.container}>

      <View style={styles.userContainer}>
        <Image
          source={{ uri: profilUri }}
          style={styles.profilPic}
        />
      </View>


      <View style={styles.messageContainer}>

        <Text style={styles.messageText}>Det är ett välkänt faktum</Text>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 70,
    paddingLeft: 10,
    marginBottom: 10,
  },
  userContainer: {
    alignItems: 'center',
    width: 50,
    marginRight: 10
  },
  messageContainer: {
    borderColor: 'rgb(225,225,225)',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 15
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