import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../../commonText/Text";
import Button from "../components/Button";
import { colors } from "../theme/colors";
import Input from "../components/Input";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { showMessage, hideMessage } from "react-native-flash-message";


const auth = getAuth(app);




export default function SignUp({ navigation }) {
  const [gender,setGender]=useState(null)
  //declare some state for input field
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [name,setName]=useState("");
  const [age,setAge]=useState("");
  const genderOption = ["Male", "Female"];
 const userInfo={email,password,name,age,gender};

 
 const signUp = async()=>{
  //1.create user with email and password
  //2. add user profile to database
  //3. navigate to home screen

  try{
    const result= await createUserWithEmailAndPassword(auth, email, password)
    await addDoc(collection(db, "users"), {
      email:email,
      password:password,
      name:name,
      age:age,
      gender:gender,
      uid:result.user.uid

    });
    console.log("done",result.user.uid);
  }
  catch(error){
console.log(error.message)
showMessage({
  message: `ERROR! ${error.message}`,
  type: "danger",
});
  }
  
  
 }
  return (
    <SafeAreaView style={{ paddingHorizontal: 18, flex: 1 }}>
      <ScrollView>
        <View>
          <Image
            source={require("../../assets/signUp.png")}
            style={{
              alignSelf: "center",
            }}
          />
          <Text style={styles.reminder} preset="h4">
            Please Register Now
          </Text>
          <View>
            <Input placeholder="Type your Email" onChange={(text)=>setEmail(text)} autoCapitalize={"none"}/>
            <Input placeholder="Type your Password" secureTextEntry onChange={(text)=>setPassword(text)}/>
            <Input placeholder="Type your Full Name" onChange={(text)=>setName(text)} autoCapitalize={"words"}/>
            <Input placeholder="Type your Age" onChange={(text)=>setAge(text)} />
          </View>
          {genderOption.map((option, index) => {
            let selected=false;
            if(option===gender){
              selected=true
            }
            //or 
            // const selected= option===gender
            return(
              <Pressable key={index} style={styles.radioContainer} onPress={()=>setGender(option)}>
              <View
                style={[
                  styles.outerCircle,
                  selected && styles.selectedOuterCircle,
                ]}
              >
                <View
                  style={[
                    styles.innerCircle,
                    selected && styles.selectedInnerCircle,
                  ]}
                />
              </View>
              <Text preset="regularBold" style={{ marginLeft: 10 }}>
                {option}
              </Text>
            </Pressable>
            )
          })}
          {/* <Pressable style={styles.radioContainer}>
            <View style={[styles.outerCircle,selected&& styles.selectedOuterCircle]}>
              <View style={[styles.innerCircle,selected&& styles.selectedInnerCircle ]}/>
            </View>
            <Text preset="regularBold" style={{marginLeft:10}}>Male</Text>
          </Pressable>
          <Pressable style={styles.radioContainer}>
            <View style={[styles.outerCircle,selected&& styles.selectedOuterCircle]}>
              <View style={[styles.innerCircle,selected&& styles.selectedInnerCircle ]}/>
            </View>
            <Text preset="regularBold" style={{marginLeft:10}}>Female</Text>
          </Pressable> */}
        </View>
        <View style={styles.lastContent}>
          <Button
            title="Signup"
            customStyle={{
              backgroundColor: colors.orange,
              alignSelf: "center",
              marginVertical: 25,
            }}
            onPress={signUp}
          />
          <Pressable
            style={{ alignSelf: "center" }}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text preset="h4">
              Have an account? {""}
              <Text preset="h4" style={{ color: colors.green }}>
                Signin
              </Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lastContent: {
    flex: 1,

    justifyContent: "center",
    alignItems: "flex-end",
    padding: 30,
  },
  reminder: {
    alignSelf: "center",
    margin: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 14,
    height: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.gray,
  },
  selectedOuterCircle: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderColor: colors.orange,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedInnerCircle: {
    width: 14,
    height: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.orange,
    backgroundColor: colors.orange,
  },
});
