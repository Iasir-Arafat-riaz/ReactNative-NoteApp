import {
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signOut } from "firebase/auth";
import Text from "../../commonText/Text";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { spacing } from "../theme/spacing";
import { AntDesign } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";




export default function Home({ user, navigation }) {
  const [notes, setNotes] = useState([]);
  //data lestener
  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));

    const queryNote = onSnapshot(q, (querySnapshot) => {
      
      const noteList = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id)
        noteList.push({...doc.data(),id:doc.id});
      });
      setNotes(noteList);
    });
    return queryNote;
  }, []);
// console.log(notes)
  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // setUser({});
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const renderItem = ({ item }) => {
    
// console.log(item)
    return (
      <View style={{ marginBottom: spacing[4] }}>
        <Pressable
          onPress={() => navigation.navigate("Edit", { updateItem: item })}
          style={[
            { borderWidth: 3, borderColor: item.noteColor },
            styles.itemList,
          ]}
        >
          <View>
            <Text
              preset="h4"
              style={{ alignSelf: "center", padding: spacing[2] }}
            >
              {item.noteTitle}
            </Text>
            <Text
              preset="regularSmall"
              style={{
                paddingHorizontal: spacing[5],
                paddingBottom: spacing[3],
              }}
            >
              {item.noteDescription}
            </Text>
          </View>
          <AntDesign
            onPress={() => {
              deleteDoc(doc(db,"notes",item.id))
              showMessage({
                message: "Your Note Deleted",
                type: "info",
              });
    
            }
            
            }
            style={{ position: "absolute", alignSelf: "flex-end", padding: 10 }}
            name="delete"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity style={styles.logOutBtn} onPress={logOut}>
          <Text preset="small">{user.email}</Text>
          <Text style={styles.logOutTxt} preset="small">
            Logout
          </Text>
        </TouchableOpacity>
        <View style={styles.addNote}>
          <Text preset="h4">ADD NOTES</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Create")}>
            <Ionicons name="add-circle" size={34} color="green" />
          </TouchableOpacity>
        </View>
        <View style={styles.flatListView}>
          <FlatList
            data={notes}
            renderItem={renderItem}
            keyExtractor={(item,index) => index}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logOutBtn: {
    alignSelf: "flex-end",

    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    fontSize: 10,

    color: "white",
    marginRight: 10,
    flexDirection: "row",
  },
  logOutTxt: {
    backgroundColor: colors.red,
    alignSelf: "center",
    padding: 2,
    borderRadius: 5,
    marginLeft: 5,
    color: "white",
  },
  addNote: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  flatListView: {
    marginHorizontal: 15,
  },
  itemList: {
    paddingTop: spacing[3],
    borderRadius: 20,
  },
});
