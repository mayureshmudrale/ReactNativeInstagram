import React, { useEffect, useState,Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import auth from "@react-native-firebase/auth"
import firebase  from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
import { TextInput } from 'react-native-paper'
import Searchitem from './Searchitem'
import { ScrollView } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper'

export default function Explore({navigation}) {
    const [users,setusers]=useState([])
   useEffect(()=>{
       firestore().collection('users').get().then(
           snapshot=>(setusers(snapshot.docs.map(doc=>({
               id:doc.id,
               data:doc.data()
           }))))
       )
      
   },[])
   
  
    
    return (
        <View style={{flex:1}}>

        <TextInput style={{marginTop:1,borderColor: "#20232a",
         borderRadius: 6,height:35,marginBottom:5,marginLeft:5,marginRight:5}}  mode='outlined' label='Search'   onChangeText={text => setSearch(text)}/>
        <ScrollView>
        {users.map(data=>{
           if(data.id!=auth().currentUser.uid){
          return(<TouchableOpacity style={styles.postheader}onPress={()=>navigation.navigate('searchprofile',{id:data.id})} key={data.id}>
       
            <Avatar.Image size={35} style={styles.avatar} source={{uri:data?.data.profilepic}} />
                
                    <Text style={{ fontWeight: 'bold',fontSize: 15}}>{data.data.username} </Text>
            </TouchableOpacity>
            )}
        })}
     
        
        
        </ScrollView>
        
    </View>
    )
}

const styles = StyleSheet.create({
   users:{
       marginTop:50
   },
   container:{
    flex:1,
},
user:{
    height:50,
    marginTop:2,
  

},
postheader:{
  flex:1,
  flexDirection:'row',
  alignItems:'center',
  backgroundColor:'#f7f7f7',
  borderColor:'lightgray',
  marginTop:2,
  height:50,

},
avatar:{
  margin:10
},
});