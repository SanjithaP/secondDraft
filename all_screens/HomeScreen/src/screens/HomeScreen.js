import React, { Component } from "react";
import { StyleSheet, View, Image, Text,ScrollView, TouchableOpacity, Dimensions, ImageBackground} from "react-native";
//import { TouchableOpacity } from "react-native-gesture-handler";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//import Icon from "react-native-vector-icons/Ionicons";

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'HomeScreen' 
  };

  render() {
  return (
    <ScrollView style={styles.container}>

    <ImageBackground
      style={styles.background}
      source={require("../assets/images//Sign-In-Background.png")}
    >

    <Image
        source={require("../assets/images/Logo.png")}
        style={{height: 100, width: 350, borderRadius: 50}}
    />

    <Image
        source={require("../assets/images/Mental-health-bro.png")}
        style={{height: 300, width: 300, }}
    />

    {/* <View style = {styles.titleContainer}>
      <Text style={styles.peacePlanner}>Peace {"\n"}Planner</Text>
    </View> */}
      
    {/* <View style = {styles.subheadingContainer}>
      <Text style={styles.subheading}>Mental health, made easy</Text>
    </View> */}
      
   
      <View style={styles.buttonPurpleRow}>

      {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("Calendar")}>
        <View style = {styles.purpleButton}>
          <Text style = {styles.navigateButtonText}>Calendar</Text>
        </View>
      </TouchableOpacity> */}

        <TouchableOpacity onPress={() => this.props.navigation.navigate("SelfCareListScreen")}>
        <View style = {styles.purpleButton}>
        <Text style = {styles.navigateButtonText}>Task List</Text>
      </View>
        </TouchableOpacity>
      


      <TouchableOpacity onPress={() => this.props.navigation.navigate("PointsScreen")}>
        <View style = {styles.purpleButton}>
          <Text style = {styles.navigateButtonText}>Points</Text>
        </View>
      </TouchableOpacity>
      

      {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("AsyncTestScreen")}>
        <View style = {styles.purpleButton}>
          <Text style = {styles.navigateButtonText}>Async</Text>
        </View>
      </TouchableOpacity> */}

      </View>

      
      
      
    </ImageBackground>
    </ScrollView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight
  },
  
  
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  peacePlanner: {
    fontFamily: "Arial",
    color: "#121212",
    textAlign: "center",
    fontSize: 60,
  },
  subheading: {
    fontFamily: "Arial",
    color: "#121212",
    fontSize: 30,
  },
  buttonPurpleRow: {
    flexDirection: "row",
    justifyContent: 'center',
  },
  purpleButton: {
    backgroundColor: "#5233ff",
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth/3,
    height: windowHeight/10,
    margin: 10,
    borderRadius: 10,
  },
  navigateButtonText: {
    color: 'white',
    fontSize: 14
  },
  background: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center'
},

});

export default HomeScreen;
