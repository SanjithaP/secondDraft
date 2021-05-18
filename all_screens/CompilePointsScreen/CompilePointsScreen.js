import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity, ImageBackground } from "react-native";

//idk why this only works 50% of the time
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

//redo all of compile points screen to look like new layout
//will switch index to async storage eventually
//dailyPoint total resets daily w/ async
//weeekly total resets weekly w/ async

const STORAGE_KEY = '@saveTasks'
const DESIRED_TASKS_KEY = '@saveDesiredTasks'
const COMPILED_POINT_KEY = "@saveEarnedPoints"

class CompilePointsScreen extends React.Component {

  static navigationOptions = {
    title: 'CompilePointsScreen' 
  };

  state = {
    index: 0,
    endingText: '',
    activityCounter: 1,
    activityList: [

    ],
    tempArray: [
      {
        activity: 'Press Yes to Begin',
        toggled: false,
        text: "Off",
        level: "",
        completed: 0,
        numToNextLevel: 1
      },
    ]
  }

  save = async (newDesiredTasksArray) => {
    try {
      await AsyncStorage.setItem(DESIRED_TASKS_KEY, JSON.stringify(newDesiredTasksArray))
      alert('Data successfully saved!')
      this.setState({ 
        activityList: newDesiredTasksArray,
       })
    } catch (e) {
      alert('Failed to save name.')
    }
  }

  retrieveData = async () => {
    try {
      const taskArray = await AsyncStorage.getItem(DESIRED_TASKS_KEY)
  
      if(taskArray != null) {
        const parsedTaskArray = JSON.parse(taskArray);

        for(var i = 0; i < parsedTaskArray.length; i++) {
          if(parsedTaskArray[i].toggled) {
            this.state.tempArray.push(parsedTaskArray[i])
          }
        }

        this.setState({
          activityList: this.state.tempArray
        })
      }
        
    } catch (e) {
      alert('Failed to load name.')
    }
}


componentDidMount() {
  this.retrieveData()
}

  render() {
  return (
    <ScrollView>
      <ImageBackground
      style={{width: windowWidth, height: windowHeight}}
      source={require("../PointsScreen/Sign-In-Background.png")}
    >

  
    <View style = {styles.middleContainer}>
    <TouchableOpacity
      onPress = {() => {
        if(this.state.index < this.state.activityList.length) {

          if(this.state.index == this.state.activityList.length-1) {
            this.setState({
              activityList: this.state.activityList
            })
          }
          else {
          this.setState({
            index: this.state.index + 1,
            activityList: this.state.activityList
          })
          }  
        }

      }}
    >
      <View style = {styles.saveButton}>
        <Text style = {styles.buttonText}>Maybe Tomorrow</Text>
      </View>
      
    </TouchableOpacity>

<View style = {styles.objectTextContainer}>
  <Text>{this.state.tempArray[this.state.index].activity}</Text>
  <Text>{this.state.tempArray[this.state.index].level}</Text>
  <Text>{this.state.endingText}</Text>
</View>

    <TouchableOpacity
      onPress = {() => {
        if(this.state.index < this.state.activityList.length) {

          this.state.activityList[this.state.index].completed += 1
          this.state.activityList[this.state.index].numToNextLevel -= 1

          if(this.state.activityList[this.state.index].numToNextLevel == 0) {
            this.state.activityList[this.state.index].level += 1
            this.state.activityList[this.state.index].numToNextLevel = this.state.activityList[this.state.index].level + 1
            this.state.activityList[this.state.index].completed = 0
          }
          
          if(this.state.index == this.state.activityList.length-1) {
            this.setState({
              activityList: this.state.activityList
            })
          }
          else {
          this.setState({
            index: this.state.index + 1,
            activityList: this.state.activityList
          })
          }

        }
        else {
          this.setState({
            endingText: "End of Activities"
          })
        }

        const onSave = this.save
        onSave(this.state.activityList)
      }}
    >
      <View style = {styles.saveButton}>
        <Text style = {styles.buttonText}>Yes</Text>
      </View>
    </TouchableOpacity>
    </View>

   
    </ImageBackground>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "white",
    alignItems: 'center'

  },
  
saveButton: {
  backgroundColor: "#5233ff",
  justifyContent: "center",
  alignItems: "center",
  margin: 20,
  borderRadius: 10,
  height: windowHeight/8,
  width: windowWidth/4,
  
 },
 buttonText: {
  color: 'white',
  fontSize: 14,
  textAlign: 'center'
},
middleContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: windowHeight - windowHeight/2,
  margin: 10
},
objectTextContainer: {
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
}
});

export default CompilePointsScreen;