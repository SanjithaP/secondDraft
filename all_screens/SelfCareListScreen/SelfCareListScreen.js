import React, { Component } from "react";
import { StyleSheet, View, Image, Alert, ImageBackground, TextInput, ScrollView, Text, Switch, TouchableOpacity, Modal, Pressable } from "react-native";
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
const DESIRED_TASKS_KEY = '@saveDesiredTasks'
const ACTIVITY_STORAGE_KEY = '@save_activityValue'


class SelfCareListScreen extends React.Component {

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  state = {
    //don't forget to come back to this 

    newActivityName: "",
    modalVisible: false,
    desiredTaskArray: [],

    activityList: 
    [
    {

      activity: 'Biking',
      toggled: false,
      text: "Off",
      level: 1,
      completed: 0,
      numToNextLevel: 2
    },
  {

      activity: 'Walking',
      toggled: false,
      text: "Off",
      level: 1,
      completed: 0,
      numToNextLevel: 2
  },
  {

      activity: 'Running',
      toggled: false,
      text: "Off",
      level: 1,
      completed: 0,
      numToNextLevel: 2
  },
{
    activity: 'Journal',
    toggled: false,
    text: "Off",
    level: 1,
    completed: 0,
    numToNextLevel: 2
},
{
    activity: 'Podcast',
    toggled: false,
    text: "Off",
    level: 1,
    completed: 0,
    numToNextLevel: 2
},
// {
//     activity: 'Listen to Music',
//     toggled: false,
//     text: "Off",
//     level: 1,
//     completed: 0,
//     numToNextLevel: 2
// },
// {
//   activity: 'Draw',
//   toggled: false,
//   text: "Off",
//   level: 1,
//   completed: 0,
//   numToNextLevel: 2
// },
// {
//   activity: 'Yoga',
//   toggled: false,
//   text: "Off",
//   level: 1,
//   completed: 0,
//   numToNextLevel: 2
// },
{
  activity: 'Meditate',
  toggled: false,
  text: "Off",
  level: 1,
  completed: 0,
  numToNextLevel: 2
},
],

}

onChangePoint = newPointValue => this.setState({ newPointValue })
onChangeActivity = newActivityName => this.setState({ newActivityName })

// onSubmitEditing = () => {
//   const onPointSave = this.savePoint
//   const { newPointValue } = this.state

//   if (!newPointValue) return

//   onPointSave(newPointValue)
//   this.setState({ newPointValue: '' })

// }
 
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

saveDesiredTaskArray = async (newDesiredTasksArray) => {
  try {
    await AsyncStorage.setItem(DESIRED_TASKS_KEY, JSON.stringify(newDesiredTasksArray))

    //alert('Data successfully saved!')
    this.setState({ 
      desiredTaskArray: newDesiredTasksArray,
     })
  } catch (e) {
    alert('Failed to save name.')
  }
}


retrieveData = async () => {
  try {
    const taskArray = await AsyncStorage.getItem(STORAGE_KEY)
    const desiredTaskArray = await AsyncStorage.getItem(DESIRED_TASKS_KEY)
    const activityName = await AsyncStorage.getItem(ACTIVITY_STORAGE_KEY)
    
    if(taskArray != null) {
      const parsedTaskArray = JSON.parse(taskArray);
      this.setState({
        activityList: parsedTaskArray
      })
    }

    if(desiredTaskArray != null) {
      const parsedDesiredTaskArray = JSON.parse(desiredTaskArray);
      this.setState({
        desiredTaskArray: parsedDesiredTaskArray
      })
    }

    if(activityName != null) {
      this.setState({
        newActivityName: ""
      })
    }
      
  } catch (e) {
    alert('Failed to load name.')
  }
}


removeEverything = async () => {
  try {
    await AsyncStorage.clear()
    alert('Storage successfully cleared!')
  } catch (e) {
    alert('Failed to clear the async storage.')
  }
}

onSubmitEditing = () => {
  const onActivitySave = this.saveActivity
  const { newActivityName } = this.state
  
  if (!newActivityName) return

  onActivitySave(newActivityName)
  this.setState({ newActivityName: "" })
}


componentDidMount() {
  this.retrieveData()
}

onChangeText = text => this.setState({ text })

 render() {

const { modalVisible, newActivityName } = this.state


 return (
   <ScrollView style={styles.container}>

<ImageBackground
      style={{width: windowWidth, height: windowHeight}}
      source={require("../SelfCareListScreen/Sign-In-Background.png")}
    >
  
   {/* <Text style = {styles.pointText}> Activity: {newActivityName} </Text>    */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
        

              <TextInput
                style={styles.input}
                value={newActivityName}
                placeholder='Activity Name'
                onChangeText={this.onChangeActivity}
                onSubmitEditing={this.onSubmitEditing}
              />
       
              <Pressable
                style={[styles.buttonForModal, styles.buttonClose]}
                onPress={() => {
                  this.setModalVisible(!modalVisible)
                  const newActivityObject = {
                    activity: newActivityName,
                    toggled: true,
                    text: "On",
                    level: 1,
                    completed: 0,
                    numToNextLevel: 2
                  }
                  this.state.activityList.push(newActivityObject)
                  this.setState({
                    activityList: this.state.activityList
                  })
                  
                  const onSave = this.save
                 // const onSaveDesiredTasks = this.saveDesiredTaskArray

                  onSave(this.state.activityList)
                  console.log("custom activity added: ", this.state.activityList)
                 // onSaveDesiredTasks(this.state.desiredTaskArray)

                }}
              >   
                <Text style={styles.textStyle}>Save Custom Task</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Pressable
          style={[styles.buttonForModal, ]}
          onPress={() => this.setModalVisible(true)}
        >
          <Image
            source={require("../SelfCareListScreen/outline_add_circle_outline_black_24dp.png")}
            style={{height: 35, width: 35}}
          />
        </Pressable>
       
 
{this.state.activityList.map((screenObject, i, activityList) =>(
         
         <View style={styles.objectContainer}>

            <View style = {styles.pointContainer}>
            <TouchableOpacity 
              onPress = {() => {
                this.state.activityList[i].toggled = !this.state.activityList[i].toggled

                if(this.state.activityList[i].toggled) {
                  this.state.desiredTaskArray.push(activityList[i]);
                  //global.globalDesiredTaskArray.push(activityList[i]);
                  this.state.activityList[i].text = "On"
                this.setState({
                  desiredTaskArray: this.state.desiredTaskArray,
                  activityList: this.state.activityList
                })
                console.log("this one", this.state.activityList)
              }

              else {
                this.state.activityList[i].text = "Off"
                this.state.activityList[i].toggled = false
                this.state.desiredTaskArray.splice(i,1)
                
                this.setState({
                  desiredTaskArray: this.state.desiredTaskArray,
                  activityList: this.state.activityList
                })
              }    
                const onSave = this.save
                const onSaveDesiredTasks = this.saveDesiredTaskArray

                onSave(this.state.activityList)
                onSaveDesiredTasks(this.state.desiredTaskArray)
              }
            }
            >

        <View style = {
          {backgroundColor: activityList[i].toggled ? "#dbffdf": "#ffb8b8",
          justifyContent: "center",
          alignItems: "center",
          height: windowHeight/10,
          width: windowWidth/4, 
          borderRadius: 10,
          marginRight: 25
        }
        }
        >
      
          <Text style = {styles.buttonText}>{this.state.activityList[i].text}</Text>
        </View>

            </TouchableOpacity>

            </View>

        <View style={styles.pointContainer}>
            <Text style={styles.pointText}>{screenObject.activity}</Text>
        </View>  

        <View style = {styles.pointContainer}>
            <TouchableOpacity 
              onPress = {() => {
                Alert.alert(
                  'Deleting task: ' + this.state.activityList[i].activity,
                  'Are you sure you want to delete ' + this.state.activityList[i].activity  + " ? Task progress cannot be recovered",
                  [
                    {text: 'Keep', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                    {text: 'Delete', onPress: () => {
                    
                    this.state.activityList.splice(i,1)
                    //THIS IS SCREWED UP BC WITH SPLICE THE ARRAY SHIFTS UP
                    this.state.desiredTaskArray.splice(i,1)
    
                    this.setState({
                      activityList: this.state.activityList
                    })
                    const onSave = this.save
                    const onSaveDesiredTasks = this.saveDesiredTaskArray
    
                    onSave(this.state.activityList)
                    onSaveDesiredTasks(this.state.desiredTaskArray)
                  }}
                ]
                );
                
              }
            }
        >

          <Image
            source={require("../SelfCareListScreen/outline_remove_circle_outline_black_24dp.png")}
            style={{height: 35, width: 35}}
          />

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
    height: windowHeight/8,
    alignItems: 'center',
    justifyContent: 'center',
},
pointText: {
  textAlign: 'center',
  fontFamily: 'Helvetica',
  fontSize: 20
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
  borderRadius: 10,
  height: windowHeight/10,
  width: windowWidth/4
},

buttonText: {
  color: 'black',
  fontSize: 14,
  textAlign: 'center',
  fontFamily: "Helvetica",

},
 clearButton: {
  backgroundColor: "#5233ff",
  justifyContent: "center",
  alignItems: "center",
  margin: 10,
  height: windowHeight/10,
  width: windowWidth/4, 
  borderRadius: 10
 },
  buttonOpen: {
      backgroundColor: "#F194FF",
  },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    input: { 
        padding: 15,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        margin: 10
    },

  text: {
        fontSize: 20,
        padding: 10,
        backgroundColor: '#bcb0ff'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    buttonForModal: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    input: { 
        padding: 15,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        margin: 10
    },
    button: {
        margin: 10,
        padding: 10,
        backgroundColor: '#5233ff'
    },

    
});
 
export default SelfCareListScreen;