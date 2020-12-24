import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';


import Home from './Home';
import Explore from './Explore';
import Upload from './Upload';
import Profile from './Profile';
import Follow from './Follow';
import Login from './Login';
import SignUp from './SignUp';
import auth from "@react-native-firebase/auth"
import firebase  from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = () => {
  const [users,setusers]=useState([])
  useEffect(()=>{
    firestore()
    .collection('users')
    .doc(auth().currentUser.uid.toString())
    .onSnapshot(
      snapshot=>(setusers(snapshot.data()))
    )
   
  },[])

  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="black"
      inactiveColor="black"
      barStyle={{ backgroundColor: 'white' }}
      shifting={true}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon name="home-outline"  size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: () => (
            <Icon name="magnify"  size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="upload"
        component={Upload}
        options={{
          tabBarIcon: () => (
            <Icon name="plus-box-outline"  size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="follow"
        component={Follow}
        options={{
          tabBarIcon: () => (
            <Icon name="heart-outline"  size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Avatar.Image size={26} source={{uri:users?.profilepic}} />
          ),
        }}
      />
      
    
    </Tab.Navigator>
  );
}