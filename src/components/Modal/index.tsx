import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { useTheme } from "../../context/themeContext";
import SearchCity from "../SearchCity";
import { useEffect } from "react";
import { getDataFromStore } from '../../storage/index';

export default ({ children }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();

  const style = styles(theme);

  return (
    <View
      style={{
        height: modalVisible ? 0 : Dimensions.get("window").height / 1.2,
        width: modalVisible ? 0 : Dimensions.get("window").width,
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={{ paddingVertical: 100 }}>
          <SearchCity closeModal={setModalVisible} />
        </View>
      </Modal>

      {!modalVisible ? (
        <Pressable
          style={style.addButtonStyle}
          onPress={() => setModalVisible(true)}
        >
          <Text style={style.addButton}>+</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    addButton: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 30,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    addButtonStyle: {
      borderRadius: 100,
      paddingHorizontal: 10,
      paddingVertical: 5,
      elevation: 2,
      backgroundColor: theme.colors?.buttonPrimary,
      position: "absolute",
      bottom: 0,
      right: 50,
      //   alignContent: "flex-end",
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
  });
