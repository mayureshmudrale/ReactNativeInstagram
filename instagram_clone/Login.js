import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, ToastAndroid } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import auth from "@react-native-firebase/auth"
import SignUp from './SignUp';

import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyB2BLhFq70RhRMYtWEZSs-K91HIzWL81P8",
  authDomain: "instagram-clone-44b7d.firebaseapp.com",
  databaseURL: "https://instagram-clone-44b7d.firebaseio.com",
  projectId: "instagram-clone-44b7d",
  storageBucket: "instagram-clone-44b7d.appspot.com",
  messagingSenderId: "382292508238",
  appId: "1:382292508238:web:988ebedf277b0800dc4d1f",
  measurementId: "G-L5XDPES7GX"
};
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
  

  
}


export default function Login({navigation}) {

  const [email, setEmail] = useState("")
  
  const [password, setpassword] = useState("")
  const firestoreForDefaultApp = firebase.firestore();
  async function addTodo() {
     
    try{await firestore().collection('users').doc(auth().currentUser.uid).set({
      Username: 'akai',
      
    });
  }
  catch(e){
    console.error(e.message)
  }
    
  }
    const doLogin = () => {
        if (!email) {
          
            ToastAndroid.show("email required", ToastAndroid.SHORT);
          
          
          return
        } else if (!password && password.trim() && password.length > 6) {
          ToastAndroid.show("weak password", ToastAndroid.SHORT);
          return
        }
    
        _Login(email, password)
      }
    
    const _Login = async (email, password) => {
        try {
          let response = await auth().signInWithEmailAndPassword(
            email,
            password
          )
          if (response && response.user) {
            Alert.alert("Success ✅", "Account loggedin successfully")
            
            /*firestore().collection('users').doc(auth().currentUser.uid).collection('posts').add({
              image:'https://c4.wallpaperflare.com/wallpaper/21/584/894/anime-boruto-hokage-naruto-naruto-uzumaki-wallpaper-preview.jpg',
              caption:'uzumaki naruto'
            })*/
            console.log(auth().currentUser.displayName)
            navigation.navigate('BottomTabs')
          }
        } catch (e) {
          ToastAndroid.show(e.message, ToastAndroid.SHORT);
          console.error(e.message)
        }
      }
    
    return (
        <View style={styles.Login}>
              <TextInput style={styles.email} mode="outlined" label="Email"   onChangeText={text => setEmail(text)}/>

              <TextInput secureTextEntry={true} style={styles.password} mode="outlined" label="Password" on onChangeText={text => setpassword(text)}/>
        
              <Button  mode="contained" style={{margin:8}} onPress={doLogin}>Login</Button>
              <Button  mode="contained" style={{margin:8}} onPress={() => navigation.navigate('signup')}>SignUP</Button>
              

        </View>
    )
}
  //() => navigation.navigate('signup')

const styles = StyleSheet.create({
  email:{
    
    height:50,
     margin:8
      
  },
  Login:{
      justifyContent:'center',
      flex:1,
  },
  
  password:{
    height:50,
    margin:8
  }
});