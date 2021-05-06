import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Touchable } from "react-native";


class SignIn extends React.Component {

  static navigationOptions = {
    title: 'SignIn' 
  };

  render() {
  return (
    <View style={styles.container}>
    <TouchableOpacity
        onPress={() => this.props.navigation.navigate("HomeScreen")}
    >
      <Text style = {styles.textStyle}>Sign in with Google</Text>
    </TouchableOpacity>
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
  textStyle: {
      color: 'lightblue',
      fontSize: 30,
      fontWeight: 'bold'
  }
});

export default SignIn;
