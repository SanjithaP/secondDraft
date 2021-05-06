import React, { Component } from "react";
import { StyleSheet, View, TextInput, ScrollView, Text, Switch, TouchableOpacity, Modal, Pressable } from "react-native";
//import {TouchableOpacity} from "react-native-gesture-handler"
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


global.globalDesiredTasksArray = [
  {
    pointValue: "15",
    activity: "Biking"
  }
]

const STORAGE_KEY = '@saveTasks'
const POINT_STORAGE_KEY = '@save_pointValue'


class SelfCareListScreen extends React.Component {

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  state = {
    //don't forget to come back to this 
    newPointValue: "0",
    modalVisible: true,

    activityList: 
    [
    {
      pointValue: 15,
      activity: 'Biking',
      toggled: false,
      text: "Off"
    },
  {
      pointValue: 20,
      activity: 'Walking',
      toggled: false,
      text: "Off"
  },
  {
      pointValue: 25,
      activity: 'Running',
      toggled: false,
      text: "Off"
  },
{
    pointValue: 15,
    activity: 'Journal',
    toggled: false,
    text: "Off"
},
{
    pointValue: 20,
    activity: 'Podcast',
    toggled: false,
    text: "Off"
},
{
    pointValue: 25,
    activity: 'Listen to Music',
    toggled: false,
    text: "Off"
},
{
  pointValue: 25,
  activity: 'Draw',
  toggled: false,
  text: "Off"
},
{
  pointValue: 25,
  activity: 'Yoga',
  toggled: false,
  text: "Off"
},
{
  pointValue: 25,
  activity: 'Meditate',
  toggled: false,
  text: "Off"
},
],

desiredTasksArray: 
  [

  ]
}

onChangePoint = newPointValue => this.setState({ newPointValue })

onSubmitEditing = () => {
  const onPointSave = this.savePoint
  const { newPointValue } = this.state

  if (!newPointValue) return

  onPointSave(newPointValue)
  this.setState({ newPointValue: '' })
}

addToDesired = () => {
  desiredTasksArray.push(activityList[i])
  this.setState({desiredTasksArray:desiredTasksArray})
}
 
save = async (newDesiredTasksArray) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDesiredTasksArray))
    alert('Data successfully saved!')
    this.setState({ 
      activityList: newDesiredTasksArray,
     })
  } catch (e) {
    alert('Failed to save name.')
  }
}

savePoint = async (newPointValue) => {
  try {
    await AsyncStorage.setItem(POINT_STORAGE_KEY, newPointValue)
    alert('Data successfully saved!')
    this.setState({ 
      newPointValue: newPointValue,
     })
  } catch (e) {
    alert('Failed to save pointValue.')
  }
}

retrieveData = async () => {
  try {
    const taskArray = await AsyncStorage.getItem(STORAGE_KEY)
    const pointValue = await AsyncStorage.getItem(POINT_STORAGE_KEY)
    if(taskArray != null) {
      const parsedTaskArray = JSON.parse(taskArray);
      this.setState({
        activityList: parsedTaskArray
      })
    }

    if(pointValue != null) {
      this.setState({
        newPointValue: pointValue
      })
    }
      
  } catch (e) {
    alert('Failed to load name.')
  }
}

// removeEverything = async () => {
//   try {
//     await AsyncStorage.clear()
//     alert('Storage successfully cleared!')
//   } catch (e) {
//     alert('Failed to clear the async storage.')
//   }
// }


componentDidMount() {
  this.retrieveData()
}

onChangeText = text => this.setState({ text })

 render() {

 return (
   <ScrollView style={styles.container}>

       
     <TouchableOpacity
    
    >
     <View style = {styles.clearButton}>
        <Text style = {styles.buttonText}>
          Add Custom Task
        </Text>
     </View>
     </TouchableOpacity>
    
 
{this.state.activityList.map((screenObject, i, activityList) =>(
         
         <View style={styles.objectContainer}>
            <View style={styles.pointContainer}>
              <Text style={styles.pointText}>{screenObject.pointValue}</Text>
             </View>
                  
            <View style={styles.pointContainer}>
              <Text style={styles.pointText}>{screenObject.activity}</Text>
            </View>  

            <View style = {styles.pointContainer}>
            <TouchableOpacity 
              onPress = {() => {
                this.state.activityList[i].toggled = !this.state.activityList[i].toggled

                if(this.state.activityList[i].toggled) {
                  this.state.desiredTasksArray.push(activityList[i]);
                  global.globalDesiredTasksArray.push(activityList[i]);
                  this.state.activityList[i].text = "On"
                this.setState({
                  desiredTasksArray: this.state.desiredTasksArray,
                  activityList: this.state.activityList
                })
                console.log("this one", this.state.activityList)
              }

              else {
                this.state.activityList[i].text = "Off"
                this.state.activityList[i].toggled = false
                
                this.setState({
                  desiredTasksArray: this.state.desiredTasksArray,
                  activityList: this.state.activityList
                })
              }    
                const onSave = this.save
                onSave(this.state.activityList)
              }
            }
            >

        <View style = {
          {backgroundColor: activityList[i].toggled ? "green": "red",
          justifyContent: "center",
          alignItems: "center",
          height: windowHeight/10,
          width: windowWidth/4, 
          borderRadius: 10
        }
        }
        >

          <Text style = {styles.buttonText}>{this.state.activityList[i].text}</Text>
        </View>

            </TouchableOpacity>
            </View>
            
            </View>

  ))}

  {/* <TouchableOpacity
    onPress = {() => {
     const removeFunction = this.removeEverything
     removeFunction()

   }} 
  >
     <View style = {styles.clearButton}>
        <Text style = {styles.buttonText}>
          Clear Tasks
        </Text>
     </View>
     </TouchableOpacity> */}
 
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
    height: windowHeight/8,
    alignItems: 'center',
    justifyContent: 'center',
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
  //borderBottomWidth: 1,
  borderBottomColor: 'white',
  backgroundColor: '#ADFCFF',
},
 redButton: {
  backgroundColor: "red",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  height: windowHeight/10,
  width: windowWidth/4
},

buttonText: {
  color: 'white',
  fontSize: 14,
  textAlign: 'center'
},
 clearButton: {
  backgroundColor: "#5233ff",
  justifyContent: "center",
  alignItems: "center",
  margin: 10,
  height: windowHeight/10,
  width: windowWidth/4, 
  borderRadius: 10
 }
});
 
export default SelfCareListScreen;
 

