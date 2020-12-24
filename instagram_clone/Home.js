import React, { Component, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Header from './Header'
import Post from './Post';
import auth from "@react-native-firebase/auth"
import firebase  from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'



export default function Home() {
    const [post,setpost]=useState([]);
    
    



    useEffect(()=>{
      firestore()
      .collection('users')
      .doc(auth().currentUser.uid.toString())
      .collection('feed')
      .orderBy('timestamp','desc')
      .onSnapshot(snapshot=>{
          setpost(snapshot.docs.map(doc=>({
              id:doc.id,
              data:doc.data()
          })))
      })
    },[])

    
    return (
        <View style={styles.container}>
                
                <View>
                    <ScrollView 
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false} >
               
                        <Header style={styles.header}/>
                        {post?.map(post=>{
                            return(
                            <Post id={post?.data.id} caption={post?.data.caption} image={post?.data.image} name={post?.data.name} key={post.id} />)
                        })}
                        
                    </ScrollView>
                </View>
               
               
        </View>
    )         
}

const styles = StyleSheet.create({
    header:{
     
     
    },
    container:{
       
        flex:1,
        

       
    },
    
  });