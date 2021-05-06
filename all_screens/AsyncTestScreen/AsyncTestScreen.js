import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Modal, TouchableOpacity, Touchable, TextInput, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const POINT_STORAGE_KEY = '@save_pointValue'

//link for reference: https://heartbeat.fritz.ai/building-offline-react-native-apps-with-asyncstorage-dcb4b0657f93
//might wanna reconstruct from the beginning
//rather than storing a whole object at once, get just the point saved
//can even have 3 modals in a row

class AsyncTestScreen extends React.Component {

  static navigationOptions = {
    title: 'AsyncTestScreen' 
  };

  
  state = {
    text: '',
    name: '',
    modalVisible: false,

    //starts as a string to avoid saving issues
    //parseInt later
    pointValue: '0',
    activityName: ""
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }


save = async pointValue => {
    try {
      await AsyncStorage.setItem(POINT_STORAGE_KEY, pointValue)
      alert('Data successfully saved!')
      this.setState({ pointValue })
    } catch (e) {
      alert('Failed to save name.')
    }
}



  retrieveData = async () => {
    try {
      const pointValue = await AsyncStorage.getItem(POINT_STORAGE_KEY)

      if (pointValue !== null) {
        this.setState({ pointValue })
      }
    } catch (e) {
      alert('Failed to load pointValue.')
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

  //DON'T FORGET AB THIS PART
  onChangePoint = pointValue => this.setState({ pointValue })



  onSubmitEditing = () => {
    const onSave = this.save
    const { pointValue } = this.state

    if (!pointValue) return

    onSave(pointValue)
    this.setState({ pointValue: '' })
}



  componentDidMount() {
    this.retrieveData()
  }

  render() {
  const { pointValue, name, modalVisible } = this.state
    
  return (
    <View style={styles.container}>

      <Text>{this.state.pointValue}</Text>
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
              <Text style={styles.modalText}>Hello World!</Text>
   
              <TextInput
                style={styles.input}
                value={pointValue}
                placeholder='Point Value'
                onChangeText={this.onChangePoint}
                onSubmitEditing={this.onSubmitEditing}
              />
       
              <Pressable
                style={[styles.buttonForModal, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >   
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Pressable
          style={[styles.buttonForModal, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
        
    

    <Text style={styles.text}>Hello {name}!</Text>
    <Text style={styles.text}>Point Value: {pointValue}</Text>
    <TouchableOpacity onPress={this.removeEverything} style={styles.button}>
        <Text style={styles.buttonText}>Clear Storage</Text>
    </TouchableOpacity>

    
</View>


  );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
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
    buttonText: {
        fontSize: 14,
        color: 'white'
    }
});

export default AsyncTestScreen;
