

import React, { useEffect, useState } from 'react';
import {
  
  StyleSheet
  
} from 'react-native';



import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';



import { BottomTabs } from './BottomNav';


import Login from './Login';

import auth from "@react-native-firebase/auth"
import firebase  from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './SignUp';
import Profile from './Profile';
import Upload from './Upload';
import Upload2 from './android/Upload2';
import SearchProfile from './SearchProfile';
import Searchitem from './Searchitem';
import Explore from './Explore';
import tempProfilepic from './tempProfilepic';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

/*const App: () => React$Node = () => {
  
 
  
  

  return (
    
  );
};*/




export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [userName,setuserName]=useState("");
  const [users,setusers]=useState([]);
  const [user1,setuser1] =useState();
  const firebaseConfig = {
    apiKey: "AIzaSyB2BLhFq70RhRMYtWEZSs-K91HIzWL81P8",
    authDomain: "instagram-clone-44b7d.firebaseapp.com",
    databaseURL: "https://instagram-clone-44b7d.firebaseio.com",
    projectId: "instagram-clone-44b7d",
    storageBucket: "instagram-clone-44b7d.appspot.com",
    messagingSenderId: "382292508238",
    appId: "1:382292508238:web:988ebedf277b0800dc4d1f",
    measurementId: "G-L5XDPES7GX"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
    

    
  }
  
 
 
 
  useEffect(()=>{
    auth().onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser)
       
        }
    })
    console.log(user)

  },[]);
   


  

  const Stack = createStackNavigator();
  return (
    <PaperProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {user!=null?(<Stack.Screen name="BottomTabs" component={BottomTabs} />):(<Stack.Screen name="Login" component={Login} />)}
      
        
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="upload" component={Upload} />
      <Stack.Screen name="upload2" component={Upload2} />
      <Stack.Screen name="Login2" component={Login} />
      <Stack.Screen name='Explore' component={Explore}/>
      <Stack.Screen name='searchitem' component={Searchitem}/>
      <Stack.Screen name='searchprofile' component={SearchProfile}/>
      <Stack.Screen name='tempProfilepic' component={tempProfilepic}/>
      <Stack.Screen name="BottomTabs2" component={BottomTabs} />
      
      </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}




const styles = StyleSheet.create({
  
  
});


