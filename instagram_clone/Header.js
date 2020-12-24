import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


export default function Header() {
   const takePhotoFromCamera = () => {
        try{
          ImageCropPicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
          }).then(image => {
            navigation.navigate('upload2',{image:image.path})
           
            
           
          });
        }catch(e){
          console.log(e.message)
        }
      }
    return (
        <View style={styles.container}>
          
        <Icon name="camera-outline" style={styles.cameraicon} onPress={takePhotoFromCamera} size={30} color="black"  />
          <Image source={{uri: 'https://www.pngitem.com/pimgs/m/32-323881_logo-new-vector-eps-instagram-word-logo-png.png'}}  
   style={styles.stretch} />
        <Icon name="paper-plane" style={styles.dm} size={30} color="black" />

        </View>
    )
}





const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f7f7f7',
        flex:5,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:"center",
        maxHeight:60,
        borderBottomColor: "lightgray",
        borderBottomWidth: StyleSheet.hairlineWidth
        
       
        
        
        
    },
    dm:{
        paddingRight:10,
        alignItems:'baseline',
        flex:1,
        marginLeft:100
       
    },

    cameraicon:{
       
        flex:2,
        marginLeft:10,
        marginRight:15,
        
        
    },

    stretch: {
        width: 250,
        height: 60,
        padding:5,
        resizeMode: 'stretch',
        marginLeft:5,
        flex:4
        
        
        
      },
  
});