import { ActivityIndicator, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import RadioInput from "../components/RadioInput";
import Text from "../../commonText/Text";
import Button from "../components/Button";
import { colors } from "../theme/colors";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { showMessage } from "react-native-flash-message";
import CommonHeader from "../components/CommonHeader";

export default function Create({ user ,navigation}) {
  const [noteColor, setNoteColor] = useState("gray");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const notesColors = ["orange", "red", "gray", "green", "blue"];
  const test = { note: noteColor };
  const [loading,setLoading]=useState(false);
  const handleNotesAdd = async () => {
    try {
      
      if(noteTitle.length<1 || noteDescription<1){
        return (showMessage({
          message: "PLEASE FILL ALL FIELD",
          type: "warning"
        }))
      }
      setLoading(true)
       await addDoc(collection(db, "notes"), {
        noteTitle,
        noteDescription,
        noteColor,
        uid: user.uid,
      });
      navigation.goBack();
      setLoading(false)
      showMessage({
        message: "Your Note Created Successfully",
        type: "success",
      });

    } catch (error) {
      console.log("Error ==>", error);
    }
  };
if(loading){
  return <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    <ActivityIndicator color={colors.green} size="large"/>
  </View>
}

  return (
    <SafeAreaView style={{ paddingHorizontal: 18 }}>
      <CommonHeader title={"Create Your Note"}/>
      <View>
        <Input
          placeholder={"Enter Your Note Title"}
          onChange={(text) => setNoteTitle(text)}
          autoCapitalize={"words"}
        />
        <Input
          placeholder={"Write Your Note"}
          multiline={true}
          onChange={(text) => setNoteDescription(text)}
        />
      </View>
      <View>
        <Text preset="h4" style={{ marginVertical: 15 }}>
          Select Your Theme Color
        </Text>
        {notesColors.map((color) => {
          let selected = false;
          if (color == noteColor) {
            selected = true;
          }
          return (
            <RadioInput
              option={color}
              selected={selected}
              onPress={() => setNoteColor(color)}
            />
          );
        })}
        <Button
          title="ADD"
          customStyle={{
            backgroundColor: colors.orange,
            alignSelf: "center",
            marginTop: 100,
          }}
          onPress={handleNotesAdd}
        />
      </View>
    </SafeAreaView>
  );
}
