import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native'; 

import HomeScreen from './all_screens/HomeScreen/src/screens/HomeScreen';
import Calendar from './all_screens/CalendarScreen/src/screens/Calendar';
//import SettingsScreen from './all_screens/SettingsScreen/src/screens/SettingsScreen';
import SelfCareListScreen from './all_screens/SelfCareListScreen/SelfCareListScreen'
import PointsScreen from './all_screens/PointsScreen/PointsScreen'
import SignIn from './all_screens/SignInScreen/SignIn'
import AsyncTestScreen from './all_screens/AsyncTestScreen/AsyncTestScreen';
import CompilePointsScreen from './all_screens/CompilePointsScreen/CompilePointsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">

        <Stack.Screen 
          name="SignIn" 
          component={SignIn} 
        />

        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
        />   
        <Stack.Screen   
          name="Calendar" 
          component={Calendar} 
        />  

        <Stack.Screen 
          name="AsyncTestScreen" 
          component={AsyncTestScreen} 
        />  
        
        <Stack.Screen 
          name="SelfCareListScreen" 
          component={SelfCareListScreen} 
        />  

        <Stack.Screen 
          name="PointsScreen" 
          component={PointsScreen} 
        />  
        <Stack.Screen 
          name="CompilePointsScreen" 
          component={CompilePointsScreen} 
        />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
