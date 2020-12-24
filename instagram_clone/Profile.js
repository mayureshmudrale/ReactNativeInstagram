import React, { Component, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Snackbar } from 'react-native-paper'

import auth from '@react-native-firebase/auth'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Icon from 'react-native-vector-icons/AntDesign';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import storage from '@react-native-firebase/storage';

export default function Profile({navigation}) {
    const[userdetails,setuserdetails]=useState();
    const [Post,setPost]=useState([]);
    const [image, setimage] = useState("");
    const [following,setfollowing]=useState([]);
    const [follower,setfollower]=useState([]);
    const uid=uuidv4();
    bs = React.createRef();
    fall = new Animated.Value(1);
    
    useEffect(()=>{
      firestore()
      .collection('users')
      .doc(auth().currentUser.uid.toString())
      .collection('follower')
      .onSnapshot(snapshot=>(setfollower(snapshot.docs.map(doc=>({
        id:doc.id
      })))))
    },[])
    
    console.log(follower)

     function uploadprofilepic(image) {
      try{
        const reference = storage().ref(`media/${uid}`);
        
        console.log(uid)
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
             .doc(auth().currentUser.uid.toString()).update({
                 profilepic:url
             })
             
             
             
             )
       });
       
       
     
       

      
       
     }
     catch(e){
         console.error(e.message)
     }
      
    }
    
    useEffect(()=>{
      firestore().collection('users').doc(auth().currentUser?.uid.toString()).onSnapshot(
        snapshot=>(setuserdetails(snapshot.data()))
    )
    },[])
    
    useEffect(()=>{
      firestore()
      .collection('users')
      .doc(auth().currentUser.uid.toString())
      .collection('following')
      .onSnapshot(snapshot=>(setfollowing(snapshot.docs.map(doc=>{
        id:doc.id

      }))))
      

    },[])
   
    useEffect( ()=>{
        if(auth().currentUser){
            firestore()
        .collection('users')
        .doc(auth().currentUser.uid.toString())
        .collection('posts')
        .onSnapshot(Snapshot=>{
            setPost(Snapshot.docs.map(doc=>({
              id:doc.id,
              data:doc.data()


            })))
        })
        
        }
     
        
    },[])
    
    console.log(Post.length)

    const takePhotoFromCamera = () => {
        try{    ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
          }).then(image => {
            setimageName(image.filename);
            setImage(image.path);
            bs.current.snapTo(0);
  
          });
        }
        catch(e){
            console.error(e.message)
          }
    
      }
  
     
  
      const choosePhotoFromLibrary = () => {
        try{
        ImagePicker.openPicker({
          width: 400,
          height: 400,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          console.log(image);
          setimage(image.path);
          uploadprofilepic(image.path)
          bs.current.snapTo(1);
          
          
         
        });
      }
      catch(e){
        console.error(e.message)
      }
      }

    const Upload=()=>{
        bs.current.snapTo(300)
    }
    const renderInner =()=>(
        <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose Your  Picture</Text>
        </View>
        <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => bs.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
      )
  
      const renderHeader =()=>(
        <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
      );
   
    const logout =  ()=>{
        try {
             auth().signOut().then(navigation.navigate('Login2'))
           
        } catch (e) {
            console.log(e);
        }
      
    }
    return (
      <View style={{flex:1,flexDirection:'row', borderBottomColor: "lightgray",
      borderBottomWidth: StyleSheet.hairlineWidth}}>
                 
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex:1,flexDirection:'row',backgroundColor:'#f7f7f7',maxHeight:50,alignItems:'center',borderBottomWidth:1, borderBottomColor: "lightgray",borderBottomWidth: StyleSheet.hairlineWidth}}>
                    <Text style={{ fontWeight: 'bold',fontSize: 20,padding:10}}>{auth().currentUser?.displayName} </Text>
                    <Button onPress={logout} mode='text' style={{alignItems:'stretch',marginLeft:85} }>logout</Button>
                </View>
                  <View style={{flex:1,backgroundColor:'#f7f7f7',height:150,flexDirection:'row',flexWrap:'wrap'}}>
                        <View style={{borderBottomColor: "lightgray",borderBottomWidth: StyleSheet.hairlineWidth}}>
                            <TouchableOpacity onPress={Upload}>
                            <Avatar.Image style={{marginLeft:20,marginTop:8}} size={100} source={{uri:userdetails?.profilepic}} />
                            </TouchableOpacity>
                            
                            <Text style={{ fontWeight: 'bold',fontSize: 15,padding:10,marginLeft:15}}>{auth().currentUser?.displayName} </Text>
                            
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
                    <BottomSheet
                ref={bs}
                snapPoints={[350, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                />

                
             
                     

                </ScrollView>


      </View>
        
    )
}

/* <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}>
                <View style={styles.postheader}>
                <Text style={{ fontWeight: 'bold',fontSize: 20,padding:10}}>{auth().currentUser?.displayName} </Text>
                <Button onPress={logout} mode='text' style={{alignItems:'stretch',marginLeft:95} }>logout</Button>
                </View>
                <ScrollView>
                    <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',borderEndWidth:2,backgroundColor:'#f7f7f7',width:365, borderBottomColor: "lightgray",
        borderBottomWidth: StyleSheet.hairlineWidth}}>
                        <View >
                            <TouchableOpacity onPress={Upload}>
                            <Avatar.Image style={{marginLeft:20,marginTop:8}} size={100} source={{uri:userdetails?.profilepic}} />
                            </TouchableOpacity>
                            
                            <Text style={{ fontWeight: 'bold',fontSize: 15,padding:10,marginLeft:15}}>{auth().currentUser?.displayName} </Text>
                            
                        </View >
                        <View style={{flex:1,flexDirection:"row",flexWrap:'wrap',height:150,padding:5}}>
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
                        
                    
                    </View>
                    
                   <View style={styles.profilepostheader}>
                    <View style={{flex:1,width:150,backgroundColor:'#f7f7f7',alignItems:'center',padding:5,borderRightWidth:StyleSheet.hairlineWidth,borderRightColor:'lightgray'}}>
                    <Icon name="plussquareo" style={styles.dm} size={30} color="black" /></View>
                    <View style={{flex:1,width:150,backgroundColor:'#f7f7f7',alignItems:'center',padding:5}}><Icon name="tag" style={styles.dm} size={30} color="black" /></View>
                    
                  
                   </View>
                   <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}>
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
                <BottomSheet
                ref={bs}
                snapPoints={[350, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                />
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
        alignItems:'center',
        backgroundColor:'#f7f7f7',
        borderEndWidth:1,
        maxHeight:50,
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

        
    },
    container: {
        flex: 1,
      },
      commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
      },
      panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
      },
      image:{
        height:300,width:350,alignItems:"center",margin:5,padding:10,
        backgroundColor:'lightgray',
      },
      header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#403d38',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
      action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
      },
      actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
      },
      textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
      },
    
  });