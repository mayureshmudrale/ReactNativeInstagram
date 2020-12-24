import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Avatar, Button } from 'react-native-paper'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function SearchProfile({route}) {
    const { id } = route.params;
    const follow="follow";
    const unfollow ="unfollow";
    const [follower,setfollower]=useState([]);
    const [getfollowing,setgetfollowing]=useState([]);
    const [following,setfollowing]=useState(false);
    
    const[userdetails,setuserdetails]=useState();
    const [Post,setPost]=useState([]);
    
    useEffect(()=>{
        firestore()
        .collection('users')
        .doc(id)
        .collection('follower')
        .onSnapshot(snapshot=>(setfollower(snapshot.docs.map(doc=>({
          id:doc.id
        })))))
      },[])
    

    useEffect( ()=>{
        
            firestore()
        .collection('users')
        .doc(id)
        .collection('posts')
        .onSnapshot(Snapshot=>{
            setPost(Snapshot.docs.map(doc=>({
              id:doc.id,
              data:doc.data()


            })))
        })
        
        
     
        
    },[])

   

    useEffect(()=>{
        firestore()
        .collection('users')
        .doc(id)
        .collection('following')
        .get()
        .then(snapshot=>(setgetfollowing(snapshot.docs.map(doc=>{
          id:doc.id
  
        }))))
        
  
      },[])
    useEffect(()=>{
        firestore()
        .collection('users')
        .doc(auth().currentUser.uid.toString())
        .collection('following')
        .doc(id)
        .get()
        .then((snapshot)=>{
            if(snapshot.exists){
                setfollowing(true)
            }
            else{
                setfollowing(false)
            }
            
        })

    })
    useEffect(()=>{
        firestore().collection('users').doc(id).onSnapshot(
            snapshot=>(setuserdetails(snapshot.data()))
        )
    })

    
    const followto=()=>{

          
            firestore()
            .collection('users').doc(auth().currentUser.uid.toString()).collection('following').doc(id.toString()).set({
             id:id
            }).then(

                firestore()
                .collection('users')
                .doc(id)
                .collection('follower')
                .doc(auth().currentUser.uid.toString())
                .set({
                    id:auth().currentUser.uid
                })


            ).then(
                Post.map(post=>{

                    firestore()
                    .collection('users')
                    .doc(auth().currentUser.uid.toString())
                    .collection('feed')
                    .doc(post.id)
                    .set({
                        timestamp:post.data.timestamp,
                        caption:post.data.caption,
                        image:post.data.image,
                        id:post.data.id,
                        name:post.data.name
                    })
                    

                })
            

            )
        
        
        
    }

    const unfollowto =()=>{
        firestore()
            .collection('users')
            .doc(auth().currentUser.uid.toString())
            .collection('following')
            .doc(id.toString())
            .delete()
            .then(
                firestore()
                .collection('users')
                .doc(id)
                .collection('follower')
                .doc(auth().currentUser.uid.toString()).delete()
                )
    }
    console.log(getfollowing)

    
    return (  
    <View style={{flex:1,flexDirection:'row', borderBottomColor: "lightgray",
    borderBottomWidth: StyleSheet.hairlineWidth}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex:1,flexDirection:'row',backgroundColor:'#f7f7f7',maxHeight:50,alignItems:'center',borderBottomWidth:1, borderBottomColor: "lightgray",borderBottomWidth: StyleSheet.hairlineWidth}}>
                    <Text style={{ fontWeight: 'bold',fontSize: 20,padding:10}}>{userdetails?.username} </Text>
                    
        </View>
        <View style={{flex:1,backgroundColor:'#f7f7f7',flexDirection:'row',flexWrap:'wrap',borderBottomColor: "lightgray",borderBottomWidth: StyleSheet.hairlineWidth}}>
                        <View  >
                            
                            <Avatar.Image style={{marginLeft:20,marginTop:8}} size={100} source={{uri:userdetails?.profilepic}} />
                            
                            
                            <Text style={{ fontWeight: 'bold',fontSize: 15,padding:10,marginLeft:15}}>{userdetails?.username} </Text>
                            
                            
                            
                        </View >
                        
                        <View style={{flex:1,flexDirection:"row",flexWrap:'wrap',height:150,padding:5,}}>
                            <View style={{height:150,flex:1,alignItems:'center',padding:5}}>
                                
                            <Text style={{fontWeight:'bold',marginTop:50,fontSize:20}}>{Post.length}</Text><Text style={{fontWeight:'bold',fontSize:12}}>Posts</Text>
                            </View>
                            <View style={{height:150,flex:1,alignItems:'center',padding:5}}>
                                
                            <Text style={{fontWeight:'bold',marginTop:50,fontSize:20}}>{follower.length}</Text ><Text style={{fontWeight:'bold',fontSize:12}}>Follower</Text>
                            </View>
                            <View style={{height:150,alignItems:'center',padding:5}}>
                                
                            <Text style={{fontWeight:'bold',fontSize:20,marginTop:50}}>{getfollowing?.length}</Text><Text style={{fontWeight:'bold',fontSize:12}}>Following</Text>
                            </View>
                        </View>
                        
                        
                </View>
                <View style={{backgroundColor:'#f7f7f7',height:35}}>
                <Button style={{margin:2,backgroundColor:'#405DE6'}} mode='contained' onPress={following?unfollowto:followto}>{following?unfollow:follow}</Button>
                </View>
                <View style={styles.profilepostheader}>
                    <View style={{flex:1,width:150,backgroundColor:'#f7f7f7',alignItems:'center',padding:5,borderRightWidth:StyleSheet.hairlineWidth,borderRightColor:'lightgray'}}>
                    <Icon name="plussquareo" style={styles.dm} size={30} color="black" /></View>
                    <View style={{flex:1,width:150,backgroundColor:'#f7f7f7',alignItems:'center',padding:5}}><Icon name="tag" style={styles.dm} size={30} color="black" /></View>
                    
                  
                </View>
                <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',}}>
                    {
                        Post.map(post=>{
                            return(
                                <TouchableOpacity style={{height:120,width:120,borderColor:'white',borderWidth:1}} key={post.id}>
                                <Image style={{height:120,width:120,borderColor:'white',borderWidth:1}} source={{uri:post?.data.image}}/>  
                                </TouchableOpacity>
                            )
                         
                        })
                    }
                    
                    
                    
                             
                    </View> 
                
        </ScrollView>
        
        
    
            
             
        
        
       
</View>
    )
}
/* <View style={{flex:1,flexDirection:'row',backgroundColor:'#f7f7f7',maxHeight:50,alignItems:'center',borderBottomWidth:1, borderBottomColor: "lightgray",borderBottomWidth: StyleSheet.hairlineWidth}}>
                    <Text style={{ fontWeight: 'bold',fontSize: 20,padding:10}}>{userdetails?.username} </Text>
                    
                </View>
                <View style={{flex:1,backgroundColor:'#f7f7f7',height:150,flexDirection:'row',flexWrap:'wrap'}}>
                <View style={{borderBottomColor: "lightgray",borderBottomWidth: StyleSheet.hairlineWidth}}>
                            
                            <Avatar.Image style={{marginLeft:20,marginTop:8}} size={100} source={{uri:userdetails?.profilepic}} />
                            
                            
                            <Text style={{ fontWeight: 'bold',fontSize: 15,padding:10,marginLeft:15}}>{userdetails?.username} </Text>
                            
                        </View >
                        <View style={{flex:1,flexDirection:"row",flexWrap:'wrap',height:150,padding:5,borderBottomColor: "lightgray",borderBottomWidth: StyleSheet.hairlineWidth }}>
                            <View style={{height:150,flex:1,alignItems:'center',padding:5}}>
                                
                            <Text style={{fontWeight:'bold',marginTop:50,fontSize:20}}>{Post.length}</Text><Text style={{fontWeight:'bold',fontSize:12}}>Posts</Text>
                            </View>
                            <View style={{height:150,flex:1,alignItems:'center',padding:5}}>
                                
                            <Text style={{fontWeight:'bold',marginTop:50,fontSize:20}}>{follower.length}</Text ><Text style={{fontWeight:'bold',fontSize:12}}>Follower</Text>
                            </View>
                            <View style={{height:150,alignItems:'center',padding:5}}>
                                
                            <Text style={{fontWeight:'bold',fontSize:20,marginTop:50}}>{following.length}</Text><Text style={{fontWeight:'bold',fontSize:12}}>Following</Text>
                            </View>
                        </View>
                        <View style={styles.profilepostheader}>
                    <View style={{flex:1,width:150,backgroundColor:'#f7f7f7',alignItems:'center',padding:5,borderRightWidth:StyleSheet.hairlineWidth,borderRightColor:'lightgray'}}>
                    <Icon name="plussquareo" style={styles.dm} size={30} color="black" /></View>
                    <View style={{flex:1,width:150,backgroundColor:'#f7f7f7',alignItems:'center',padding:5}}><Icon name="tag" style={styles.dm} size={30} color="black" /></View>
                    
                  
                   </View>
                   <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',height:340}}>
                    {
                        Post.map(post=>{
                            return(
                                <TouchableOpacity style={{height:120,width:120,borderColor:'white',borderWidth:1}} key={post.id}>
                                <Image style={{height:120,width:120,borderColor:'white',borderWidth:1}} source={{uri:post?.data.image}}/>  
                                </TouchableOpacity>
                            )
                         
                        })
                    }
                    
                    
                    
                             
                    </View>  

                </View>*/
const styles = StyleSheet.create({
   
    container:{
       
        flex:1,
        

       
    },
    profile:{
        backgroundColor:'#f7f7f7',
    },
    postheader:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        backgroundColor:'#f7f7f7',
        width:500,
        marginTop:2,
        height:50,
        borderEndWidth:1,
        borderBottomColor: "lightgray",
        borderBottomWidth: StyleSheet.hairlineWidth

    },dm:{
        paddingRight:10,
        alignItems:'center',
        flex:1,
        
       
    },
    cameraicon:{
       
        flex:2,
        marginLeft:10,
        marginRight:15,
        
        
    },
    profilepostheader:{
        flex:1,
        backgroundColor:'green',
        height:50,
        borderBottomColor: "lightgray",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection:"row",
        flexWrap:'wrap'

        
    }
    
  });