import React, { Component } from "react";
import { StyleSheet, View, Image, Text,ScrollView, TouchableOpacity} from "react-native";
//import { TouchableOpacity } from "react-native-gesture-handler";

//import Icon from "react-native-vector-icons/Ionicons";

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'HomeScreen' 
  };

  render() {
  return (
    <ScrollView style={styles.container}>

    <View style = {styles.titleContainer}>
      <Text style={styles.peacePlanner}>Peace {"\n"}Planner</Text>
    </View>
      
    <View style = {styles.subheadingContainer}>
      <Text style={styles.subheading}>Mental health, made easy</Text>
    </View>
      
    <View style = {styles.imageContainer}>
    <Image
        source={require("../assets/images/Phone_customization-rafiki.png")}
        style={{height: 200, width: 200, }}
      />

    </View>



      <View style={styles.buttonPurpleRow}>

      <TouchableOpacity onPress={() => this.props.navigation.navigate("Calendar")}>
        <View style = {styles.purpleButton}>
          <Text style = {styles.navigateButtonText}>Calendar</Text>
        </View>
      </TouchableOpacity>

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
      

      <TouchableOpacity onPress={() => this.props.navigation.navigate("AsyncTestScreen")}>
        <View style = {styles.purpleButton}>
          <Text style = {styles.navigateButtonText}>Async</Text>
        </View>
      </TouchableOpacity>

      </View>

      
      
      
    
    </ScrollView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    flex: 1,
    margin: 20
  },
  subheadingContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1
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
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
  },
  purpleButton: {
    backgroundColor: "#5233ff",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 10,
  },
  navigateButtonText: {
    color: 'white',
    fontSize: 14
  },

});

export default HomeScreen;
