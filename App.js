import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import Create from "./src/screens/Create";
import Edit from "./src/screens/Edit";
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'antonioMedium': require('./assets/fonts/Antonio-Medium.ttf'),
    'spartanBold': require('./assets/fonts/Spartan-Bold.ttf'),
    'spartanRegular': require('./assets/fonts/Spartan-Regular.ttf'),
  });

  const user = false;
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
  return (
    <NavigationContainer theme={MyTheme} styles={styles.container}>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="Edit" component={Edit} />
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
