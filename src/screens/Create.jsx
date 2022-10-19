import { View } from "react-native";
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

export default function Create({ user ,navigation}) {
  const [noteColor, setNoteColor] = useState("gray");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const notesColors = ["orange", "red", "gray", "green", "blue"];
  const test = { note: noteColor };
  const handleNotesAdd = async () => {
    try {
       await addDoc(collection(db, "notes"), {
        noteTitle,
        noteDescription,
        noteColor,
        uid: user.uid,
      });
      navigation.goBack();
      showMessage({
        message: "Your Note Created Successfully",
        type: "success",
      });

    } catch (error) {
      console.log("Error ==>", error);
    }
  };
  return (
    <SafeAreaView style={{ paddingHorizontal: 18 }}>
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
