import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";


class Calendar extends React.Component {

  static navigationOptions = {
    title: 'Calendar' 
  };

  render() {
  return (
    <View style={styles.container}>
      <Text>Coming Soon!</Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Calendar;
