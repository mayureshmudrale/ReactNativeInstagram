import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ToastAndroid, Alert } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';
export default function SignUp({navigation}) {
    const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
    const [Username,setUsername] = useState("")
  
    const doSignUp = () => {
        if (!email) {
          
            ToastAndroid.show("email required", ToastAndroid.SHORT);
          
          
          return
        } else if (!password && password.trim() && password.length > 6) {
          ToastAndroid.show("weak password", ToastAndroid.SHORT);
          return
        }
    
        doCreateUser(email, password)
      }
      async function addUser(){
       await firestore()
            .collection('users').doc(auth().currentUser.uid.toString()).set({
              username:auth().currentUser.displayName
            })

      }
    
    const doCreateUser = async (email, password) => {
        try {
          let response = await auth().createUserWithEmailAndPassword(
            email,
            password
          )
          if (response && response.user) {
            Alert.alert("Success ✅", "Account created successfully")
            auth().signInWithEmailAndPassword(email,password)
            const user = auth().currentUser;
            user.updateProfile({
              displayName:Username
            })
            firestore()
            .collection('users').doc(auth().currentUser.uid.toString()).set({
              username:Username
            }).then(
              
              navigation.navigate('BottomTabs')
            )
            

          
          
            
            
          }
        } catch (e) {
          ToastAndroid.show(e.message, ToastAndroid.SHORT);
          console.error(e.message)
        }
      }
    return (
        
        <View style={styles.Login}>
              <TextInput style={styles.email} mode="outlined" label="Username"   onChangeText={text => setUsername(text)}/>
              <TextInput style={styles.email} mode="outlined" label="Email"   onChangeText={text => setEmail(text)}/>

              <TextInput secureTextEntry={true} style={styles.password} mode="outlined" label="Password"  onChangeText={text => setpassword(text)}/>
        
              
                 <Button  mode="contained" style={{margin:8}} onPress={doSignUp}>signup</Button>

        </View>
        
    )
}

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