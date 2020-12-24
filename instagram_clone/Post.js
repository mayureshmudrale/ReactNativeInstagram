import React, { Component, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore'

export default function Post(props) {
    const[user,setuser] =useState();

    useEffect(()=>{
        firestore()
        .collection('users')
        .doc(props.id)
        .onSnapshot(
            snapshot=>(setuser(snapshot.data()))
        )
    

    },[])
    

    return (
        <View style={styles.container}>
                <View style={styles.postheader}>
                <Avatar.Image size={35} style={styles.avatar} source={{uri:user?.profilepic}} />
                <Text style={{ fontWeight: 'bold',fontSize: 15}}>{props?.name} </Text></View>
                
                <Image style={styles.image} source={{uri:props.image}}/>
                <View style={styles.likecomments}>
                    <Icon style={{padding:5,margin:2}} name="heart-o"  size={26} />
                    <Icon style={{padding:5,margin:2}} name="comment-o"  size={26} />
                    <Icon style={{padding:5,margin:2}} name="paper-plane"  size={26} />
                    
                </View>
                
                <View style={styles.caption}>
                <Text style={{ fontWeight: 'bold',fontSize: 13}}>{props?.name} </Text>
    <Text style={{justifyContent:'space-evenly'}}>{props?.caption}</Text>
                </View>
                
                
            </View>
    )
}

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        

      
    },
    likecomments:{
            flex:1,
            flexDirection:'row',
            alignItems:'center'

    },
    caption:{
        flex:1,
        flexDirection:'column',
        marginLeft:5,

        



    },
    image:{
        height:300,
        

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