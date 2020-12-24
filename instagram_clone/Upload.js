import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated, { set } from 'react-native-reanimated'
import { Button, TextInput } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Upload({navigation}) {

  const [image, setImage] = useState();
  const [Disable,setDisable] =useState(true);
  const [imageName,setimageName]=useState('');
  
  bs = React.createRef();
  fall = new Animated.Value(1);





const takePhotoFromCamera = () => {
    try{
      ImagePicker.openCamera({
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        cropping: true,
        compressImageQuality: 0.7
      }).then(image => {
        setimageName(image.filename);
        setImage(image.path);
        setDisable(false);
        bs.current.snapTo(1);
      });
    }catch(e){
      console.log(e.message)
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
        setImage(image.path);
        setDisable(false);
        bs.current.snapTo(1);
        
      });
    }
    catch(e){
      console.error(e.message)
    }
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

    const next=()=>{
      navigation.navigate('upload2',{image:image})
     
    }
    
    return (
        <>
      <View
        style={{
          flex: 1,
          
          flexDirection:'column'
          ,backgroundColor:'#f7f7f7'
         
        }}

      > 
        
        <Button icon="arrow-right-thick" style={{margin:1,marginLeft:240}} disabled={Disable} mode='text' color='#7323c2' onPress={next}>
           Next
        </Button>
        
        <Image style={styles.image} source={{uri:image}}/>
        <View style={{alignContent:'center',flex:1,backgroundColor:'#f7f7f7',flexDirection:'column',height:10,margin:115}}>
        <Text >swipe up to upload </Text>
        </View>
        
        
       
        
      </View >
      
     

      <BottomSheet
        ref={bs}
        snapPoints={[330, 50]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
    </>
        
    )
}

const styles = StyleSheet.create({
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
