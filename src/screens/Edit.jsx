import { View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import Text from "../../commonText/Text";
import RadioInput from "../components/RadioInput";
import Button from "../components/Button";
import { colors } from "../theme/colors";
import { collection, doc, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { showMessage } from "react-native-flash-message";

export default function Edit({ route, navigation }) {
  const editNoteItem = route.params.updateItem;
  console.log(editNoteItem)

  
  
  // console.log("the new city's id:", id);
  const [noteColor, setNoteColor] = useState(editNoteItem.noteColor);
  const [noteTitle, setNoteTitle] = useState(editNoteItem.noteTitle);
  const [noteDescription, setNoteDescription] = useState(
    editNoteItem.noteDescription
  );
  const notesColors = ["orange", "red", "gray", "green", "blue"];
  // console.log(route.params.updateItem)
  
  const handleNotesUpdate = async () => {
    
    try {
      // const washingtonRef = doc(db, "notes",editNoteItem.uid );
      await updateDoc(doc(db, "notes", editNoteItem.id), {
        noteTitle: noteTitle,
        noteDescription: noteDescription,
        noteColor: noteColor,
      });
      showMessage({
        message: "Your Note Updated",
        type: "info",
      });

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ paddingHorizontal: 18 }}>
      <View>
        <Input
          placeholder={"Enter Your Note Title"}
          onChange={(text) => setNoteTitle(text)}
          autoCapitalize={"words"}
          defaultValue={noteTitle}
        />
        <Input
          placeholder={"Write Your Note"}
          multiline={true}
          onChange={(text) => setNoteDescription(text)}
          defaultValue={noteDescription}
        />
      </View>
      <View>
        <Text preset="h4" style={{ marginVertical: 15 }}>
          Update Your Theme Color
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
          title="UPDATE"
          customStyle={{
            backgroundColor: colors.orange,
            alignSelf: "center",
            marginTop: 100,
          }}
          onPress={handleNotesUpdate}
        />
      </View>
    </SafeAreaView>
  );
}
