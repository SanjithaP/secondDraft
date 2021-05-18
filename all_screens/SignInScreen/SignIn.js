import React, { Component } from "react";
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image, Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class SignIn extends React.Component {

  static navigationOptions = {
    title: 'SignIn' 
  };

  render() {
  return (
    <View style={styles.container}>

    <ImageBackground
      style={styles.background}
      source={require("../SignInScreen/assets/Sign-In-Background.png")}
    >
    {/* <Text style = {styles.titleText}>
      Welcome to Peace Planner
    </Text> */}

      <Image
        source={require("../SignInScreen/assets/Logo.png")}
        style={{height: 100, width: 350, borderRadius: 50}}
      />

    <TouchableOpacity
        onPress={() => this.props.navigation.navigate("HomeScreen")}
    >
      <View style = {styles.button}>
      <Image
        source={require("../SignInScreen/assets/Google__G__Logo.png")}
        style={{height: 20, width: 20, }}
      />
        <Text style = {styles.textStyle}>   Sign in with Google</Text>
      </View>
      
    </TouchableOpacity>
    </ImageBackground>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontFamily: "Helvetica",
    fontSize: 20
  },
  textStyle: {
      color: '#757575',
      fontSize: 20,
      fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#f2f7ff',
    width: windowWidth/1.5,
    height: windowHeight/10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    flexDirection: "row", 
    borderRadius: 10,
    margin: 50
  },
  background: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center'
},
});

export default SignIn;

