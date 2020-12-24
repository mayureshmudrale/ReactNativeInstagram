import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Button, IconButton, TextInput } from 'react-native-paper';
export default function tempProfilepic({route}) {

    const {image} =route.params;
    const uid=uuidv4();
    const reference = storage().ref(`media/${uid}`);
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
                .doc(auth().currentUser.uid).set({
                    profilepic:url
                })
                
                
                
                )
          });
          
          
        
          

         
          
        }
        catch(e){
            console.error(e.message)
        }

    }
   

    return (
        <View>
        <View>
            <Image style={styles.image} source={{uri:image}}/>
            
          
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