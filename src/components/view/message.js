import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Message = props => {

  const style = [];
  style.push(styles.container);
  // if (props.last) {
  //   style.push({ borderBottomWidth: StyleSheet.hairlineWidth })
  // }
  const profilUri = 'https://lh3.googleusercontent.com/gKeTaztl9x0EgVC0BeGsTrU2rxgRqJZ2SAZmECxChSpGpIMHQitPMCzrlWoN91pvpQgr8-oD4iRhN3EDVHoyLOtnqYY';

  return (

    <TouchableOpacity style={style} onPress={() => props.nav()} >

      <View style={styles.topRow}>

        <View style={styles.userContainer}>
          <Image
            source={{ uri: profilUri }}
            style={styles.profilPic}
          />
          <Text style={styles.profilName}>{props.fromUser}</Text>
        </View>


        <View style={styles.timeContainer}>
          <Text>Yesterday</Text>
        </View>


      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.messageText}>{props.message}</Text>
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: 'rgb(225,225,225)',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10
  },
  topRow: {
    flexDirection: 'row'
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  timeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  bottomRow: {
    marginTop: 20
  },
  profilPic: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginRight: 10
  },
  profilName: {
    fontSize: 20
  },
  messageText: {
    fontSize: 12
  }
});

export default Message;