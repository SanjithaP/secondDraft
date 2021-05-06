import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";

//idk why this only works 50% of the time
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//will switch index to async storage eventually
//dailyPoint total resets daily w/ async
//weeekly total resets weekly w/ async
//lifetime never resets but is stored in async

class CompilePointsScreen extends React.Component {

  static navigationOptions = {
    title: 'CompilePointsScreen' 
  };

  state = {
    index: 0,
    dailyTotalPoints: 0,
    weeklyPointTotal: 0,
    lifetimePointTotal: 0,
    endingText: ''
  }

  updateYes = () => {
    
    if(this.state.index < global.globalDesiredTasksArray.length - 1) {
      this.setState({
        dailyTotalPoints: this.state.dailyTotalPoints + parseInt(global.globalDesiredTasksArray[this.state.index].pointValue),
        weeklyPointTotal: this.state.weeklyPointTotal + parseInt(global.globalDesiredTasksArray[this.state.index].pointValue),
        lifetimePointTotal: this.state.lifetimePointTotal + parseInt(global.globalDesiredTasksArray[this.state.index].pointValue),
        index: this.state.index + 1
      })
    }

    if(this.state.index == global.globalDesiredTasksArray.length - 1) {
      this.setState({
        endingText: 'End of Activities'
      })
    }
  }

  updateNo = () => {
    
    if(this.state.index < global.globalDesiredTasksArray.length - 1) {
      this.setState({
        index: this.state.index + 1
      })
    }

    if(this.state.index == global.globalDesiredTasksArray.length - 1) {
      this.setState({
        endingText: 'End of Activities'
      })
    }
  }

  render() {
  return (
    <ScrollView>
    <View style={styles.container}>
      
      <View style = {styles.topBar1}>
        <Text style = {styles.titleText}>Today's Point Total: {this.state.dailyTotalPoints}</Text>
      </View>
      <View style = {styles.topBar2}>
        <Text style = {styles.titleText}>This Week's Point Total: {this.state.weeklyPointTotal}</Text>
      </View>
      <View style = {styles.topBar3}>
        <Text style = {styles.titleText}>Lifetime Point Total: {this.state.lifetimePointTotal}</Text>
      </View>

    <View style = {styles.middleContainer}>
    <TouchableOpacity
      onPress = {this.updateNo}
    >
      <View style = {styles.saveButton}>
        <Text style = {styles.buttonText}>Maybe Tomorrow</Text>
      </View>
    </TouchableOpacity>

<View style = {styles.objectTextContainer}>
  <Text>{global.globalDesiredTasksArray[this.state.index].pointValue}</Text>
  <Text>{global.globalDesiredTasksArray[this.state.index].activity}</Text>
  <Text>{this.state.endingText}</Text>
</View>

    <TouchableOpacity
      onPress = {this.updateYes}
    >
      <View style = {styles.saveButton}>
        <Text style = {styles.buttonText}>Yes</Text>
      </View>
    </TouchableOpacity>
    </View>

    </View>
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
  topBar1: {
    height: windowHeight/10,
    width: windowWidth,
    justifyContent: 'center',
    backgroundColor: '#c5abff',
  },
  topBar2: {
    height: windowHeight/10,
    width: windowWidth,
    justifyContent: 'center',
    backgroundColor: '#a075ff',
  },
  topBar3: {
    height: windowHeight/10,
    width: windowWidth,
    justifyContent: 'center',
    backgroundColor: '#773dff',
  },
  titleText: {
    fontSize: windowHeight/25,
    textAlign: 'center',
    fontFamily: 'Arial',
    color: 'white',
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