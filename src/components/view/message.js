import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = props => {

  const style = [];
  style.push(styles.container);
  if (props.last) {
    style.push({ borderBottomWidth: StyleSheet.hairlineWidth })
  }

  return (

    <View style={style}>
      <Text>{props.toUser}</Text>
      <Text>{props.fromUser}</Text>
      <Text>{props.message}</Text>
      <Text>{props.dateTime}</Text>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: 'black',
    borderTopWidth: StyleSheet.hairlineWidth
  }
});

export default Message;