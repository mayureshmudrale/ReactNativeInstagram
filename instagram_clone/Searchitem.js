import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper'

export default function Searchitem(props,{navigation}) {
 
    const navigate=()=>{
        navigation.navigate('searchprofile')
    }
    
    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.postheader}onPress={navigate}>
       
        <Avatar.Image size={35} style={styles.avatar}  source={{uri:'https://live.staticflickr.com/7331/9404155015_95482cd303_c.jpg'}} />
            
                <Text style={{ fontWeight: 'bold',fontSize: 15}}>{props.name} </Text>
        </TouchableOpacity>
        
                
        </View>
        
    )
}


const styles = StyleSheet.create({
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