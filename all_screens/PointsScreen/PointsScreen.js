import React, { Component } from "react";
import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Text } from "react-native";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class PointsScreen extends React.Component { 

  static navigationOptions = {
    title: 'PointsScreen' 
  };

  render() {
  return (
    <ScrollView style={styles.container}> 

   
      <Text>Did you complete your tasks for the day?</Text>

      {global.globalDesiredTasksArray.map((screenObject, i) =>(
        <View style={styles.objectContainer}>
        
        <View style = {styles.pointContainer}>
          <Text style={styles.pointText}>{screenObject.pointValue}</Text>
        </View>
        
   
        <View style = {styles.pointContainer}>
          <Text style={styles.pointText}>{screenObject.activity}</Text>
          </View>

          <View style = {styles.pointContainer}>
            <TouchableOpacity 
              style = {styles.redButton}
              onPress = {() => {
                global.globalDesiredTasksArray.splice(i, 1);
              }}
            >
              <Text style = {styles.buttonText}>Pop</Text>
            </TouchableOpacity>
            </View>

          </View>
            
      ))}
    <TouchableOpacity onPress={() => this.props.navigation.navigate("CompilePointsScreen")}>
    <View style = {styles.saveButton}>
        <Text style = {styles.buttonText}>Compile Points</Text>
      </View>
    </TouchableOpacity>
      

      </ScrollView>

  );
  
}
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth
  },
  pointContainer: {
    width: windowWidth/4,
    height: windowHeight/3,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1
},
pointText: {
  textAlign: 'center',
  fontFamily: 'Arial',
  fontSize: 20
},
objectContainer: {
  flexDirection: 'row',
  width: windowWidth,
  height: windowHeight/8,
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomWidth: 1,
  borderBottomColor: 'white',
  backgroundColor: '#ADFCFF',
},
 redButton: {
  backgroundColor: "red",
  justifyContent: "center",
  alignItems: "center",
  margin: 10,
  borderRadius: 10,
  height: windowHeight/10,
  width: windowWidth/4
},
buttonText: {
  color: 'white',
  fontSize: 14
},
saveButton: {
  backgroundColor: "#5233ff",
  justifyContent: "center",
  alignItems: "center",
  margin: 10,
  borderRadius: 10,
  height: windowHeight/10,
  width: windowWidth/4
 }
});

export default PointsScreen;
