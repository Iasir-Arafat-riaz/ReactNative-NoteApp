import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import Create from "./src/screens/Create";
import Edit from "./src/screens/Edit";
import { useFonts } from 'expo-font';
import FlashMessage from "react-native-flash-message";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";
import { useEffect, useState } from "react";
import { colors } from "./src/theme/colors";

//firebase
const auth = getAuth(app);

// Initialize Firebase


const Stack = createNativeStackNavigator();

export default function App() {
const [user,setUser]=useState(null);
const [loading,setLoading]=useState(true);
  const [fontsLoaded] = useFonts({
    'antonioMedium': require('./assets/fonts/Antonio-Medium.ttf'),
    'spartanBold': require('./assets/fonts/Spartan-Bold.ttf'),
    'spartanRegular': require('./assets/fonts/Spartan-Regular.ttf'),
  });

  //obserber
useEffect(()=>{
  const authSubscription=onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
      setLoading(false)
    } else {
      setUser(null)
      setLoading(false)
    }
  });
  return authSubscription;
},[auth])
  
  const MyTheme = {  
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff ",
    },
  };
  if (!fontsLoaded) {
    return <Text>Font not found</Text>;
  }
if(loading){
  return <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    <ActivityIndicator color={colors.green} size="large"/>
  </View>
}

  return (
    <NavigationContainer theme={MyTheme} styles={styles.container}>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        {user ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props)=><Home {...props} user={user}/>}
            </Stack.Screen>
            <Stack.Screen name="Create" options={{headerTitle: 'Create Notes'}}>
            {(props)=><Create {...props} user={user}/>}
            </Stack.Screen>
            <Stack.Screen name="Edit" >
            {(props)=><Edit {...props} user={user}/>}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
              
            />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
