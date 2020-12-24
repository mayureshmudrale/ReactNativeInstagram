import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from "@react-native-firebase/auth"
export default function Upload2({route, navigation}) {
    const { image } = route.params;
    const [imageurl,setimageurl]=useState(image)
    const [getfollowerspost,setfollowerspost]=useState([]);
    const [Caption,setCaption]=useState('');
    const uid=uuidv4();
    const [url,seturl]=useState('')
    
    

    const reference = storage().ref(`media/${uid}`);

    useEffect(()=>{
      firestore()
      .collection('users')
      .doc(auth().currentUser.uid.toString())
      .collection('follower')
      .onSnapshot(snapshot=>{
          setfollowerspost(snapshot.docs.map(doc=>({
              id:doc.id
          })))
      })
  },[])
   

    const uploadToStorage= ()=>{
        try{
           const task =  reference.putFile(image)
            
           task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
          });

       
          
          task.then(() => {
            console.log('Image uploaded to the bucket!');
            storage()
            .ref("media")
            .child(uid)
            .getDownloadURL()
            .then(url =>
                
                firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .collection('posts')
                .doc(uid)
                .set(
                  {timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                  caption:Caption,
                  image:url,
                  id:auth().currentUser.uid,
                  name:auth().currentUser.displayName
                  }
                )
                
                
                )
          });
          
          task.then(()=>{
            storage()
            .ref("media")
            .child(uid)
            .getDownloadURL()
            .then(url =>
              firestore()
              .collection('users')
              .doc(auth().currentUser.uid)
              .collection('feed')
              .doc(uid.toString())
              .set(
                {timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                  caption:Caption,
                  image:url,
                  id:auth().currentUser.uid,
                  name:auth().currentUser.displayName
                  }
              )
              )
              
              task.then(
                getfollowerspost.map(followers=>{
                  storage()
                  .ref("media")
                  .child(uid)
                  .getDownloadURL()
                  .then(url=>
                    firestore()
                    .collection('users')
                    .doc(followers.id)
                    .collection('feed')
                    .doc(uid.toString())
                    .set(
                      {timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:Caption,
                        image:url,
                        id:auth().currentUser.uid,
                        name:auth().currentUser.displayName
                        }
                    ))
                 
                })
                
              ).then(
                
                
                navigation.navigate('BottomTabs2')
              )
          }).then(setCaption(null))
        
          

         
          
        }
        catch(e){
            console.error(e.message)
        }

    }
    return (
        <View>
        <View>
            <Image style={styles.image} source={{uri:imageurl?imageurl:undefined}}/>
            <TextInput style={styles.caption} mode='outlined' label="Enter caption"   onChangeText={text => setCaption(text)}/>
          
        </View>
        <Button color ='black' mode='contained' style={{margin:8}} onPress={uploadToStorage}>upload</Button>
        </View>
    )
}

  const styles = StyleSheet.create({
    image:{
        height:300,width:350,alignItems:"center",margin:5,padding:10,
        backgroundColor:'lightgray',
      },
      caption:{
    
        height:50,
         margin:8
          
      }
  
});