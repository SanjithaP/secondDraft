import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, ScrollView, TouchableOpacity, Text } from "react-native";
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const STORAGE_KEY = '@saveTasks'
const DESIRED_TASKS_KEY = '@saveDesiredTasks'


class PointsScreen extends React.Component { 

  static navigationOptions = {
    title: 'PointsScreen' 
  };

  state = {
    activityList: [],
    index: 0,
    endingText: "",
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

  //parse through only the true stuff in receiveData

  save = async (newDesiredTasksArray) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDesiredTasksArray))
      //('Data successfully saved!')
      this.setState({ 
        activityList: newDesiredTasksArray,
       })
    } catch (e) {
      alert('Failed to save name.')
    }
  }

  retrieveData = async () => {
    try {
      //const desiredTaskArray = await AsyncStorage.getItem(DESIRED_TASKS_KEY)
      const fullTasksArray = await AsyncStorage.getItem(STORAGE_KEY)

      //fullTasksArray holds all current preferences, parse and store
      if(fullTasksArray != null) {
        const parsedFullTasksArray = JSON.parse(fullTasksArray);

        for(var i = 0; i < parsedFullTasksArray.length; i++) {
          if(parsedFullTasksArray[i].toggled) {
            this.state.tempArray.push(parsedFullTasksArray[i])
          }
        }

        this.setState({
          activityList: this.state.tempArray.slice(1, this.state.tempArray.length),
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
    <ScrollView style={styles.container}> 
    <ImageBackground
      style={{width: windowWidth, height: windowHeight}}
      source={require("../PointsScreen/Sign-In-Background.png")}
    >


    <TouchableOpacity onPress = {() => {
      this.props.navigation.navigate("CompilePointsScreen")
    }}>
      <View style = {styles.saveButton}>
        <Text style = {styles.buttonText}>
          Compile Points (Coming Soon!)
        </Text>
      </View>
    </TouchableOpacity>

    <View style={styles.objectContainer}>
        <View style={styles.pointContainer}>
              <Text style={styles.pointText}>Activity</Text>
        </View>

        <View style={styles.pointContainer}>
              <Text style={styles.pointText}>Level</Text>
        </View>

        <View style={styles.pointContainer}>
              <Text style={styles.pointText}>Completed</Text>
        </View>

        <View style={styles.pointContainer}>
              <Text style={styles.pointText}># to Next Level</Text>
        </View>
      </View>

    {this.state.activityList.map((screenObject, i, activityList) =>(
      <View style={styles.objectContainer}>
        <View style={styles.pointContainer}>
              <Text style={styles.pointText}>{screenObject.activity}</Text>
        </View>

        <View style={styles.pointContainer}>
              <Text style={styles.pointText}>{screenObject.level}</Text>
        </View>

        <View style={styles.pointContainer}>
              <Text style={styles.pointText}>{screenObject.completed}</Text>
        </View>

        <View style={styles.pointContainer}>
              <Text style={styles.pointText}>{screenObject.numToNextLevel}</Text>
        </View>
      </View>

    ))}

<View style = {styles.middleContainer}>
    <TouchableOpacity
      onPress = {() => {
        console.log("maybe tmrw: ", this.state.index)
        if(this.state.index < this.state.activityList.length) {
          //do this bc activityList.length is one less than tempArray
          if(this.state.index == this.state.activityList.length) {
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
  <Text>{this.state.endingText}</Text>
</View>

    <TouchableOpacity
      onPress = {() => {
        if(this.state.index < this.state.activityList.length) {

          this.state.activityList[this.state.index].completed += 1
          console.log("added completed", this.state.activityList[this.state.index].completed)
          this.state.activityList[this.state.index].numToNextLevel -= 1

          if(this.state.activityList[this.state.index].numToNextLevel == 0) {
            this.state.activityList[this.state.index].level += 1
            this.state.activityList[this.state.index].numToNextLevel = this.state.activityList[this.state.index].level + 1
            this.state.activityList[this.state.index].completed = 0
          }
          
          //do this bc activityList.length is one less than tempArray
          if(this.state.index == this.state.activityList.length) {
            this.setState({
              activityList: this.state.activityList,
              endingText: "End of Activities"
            })
          }
          else {
          this.setState({
            index: this.state.index + 1,
            activityList: this.state.activityList
          })
          }
        }
        
        const onSave = this.save
        onSave(this.state.activityList)

        console.log("yes pressed:", this.state.activityList)
        //console.log("yes pressed,", this.state.index)
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
  fontSize: 15
},
objectContainer: {
  flexDirection: 'row',
  width: windowWidth-20,
  height: windowHeight/8,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  backgroundColor: 'white',
  borderRadius: 10,
  margin: 5
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
  textAlign: 'center',
  margin: 10,
  borderRadius: 10,
  height: windowHeight/10,
  width: windowWidth/4
 },
 middleContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
objectTextContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
}
});

export default PointsScreen;
