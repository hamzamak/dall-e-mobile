import { View, Image, StyleSheet, Modal, Text, Pressable, Alert, Platform, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useFonts } from 'expo-font';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const Card = ({ item }) => {
  const randomIndex = Math.floor(Math.random() * 3);

  const [modalVisible, setModalVisible] = useState(false);
  const showMenu = () => { setModalVisible(!modalVisible) }

  const getPermissionTosaveImage = async (uri) => {
    try {
      // Request device storage access permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        // Save image to media library
        await MediaLibrary.saveToLibraryAsync(uri);
        var msg = "Image successfully saved"
        if (Platform.OS === 'android')

          ToastAndroid.show(msg, ToastAndroid.SHORT)
        else {
          Alert.prompt("Image successfully saved", msg);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const downloadImg = async (url) => {
    FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + item.name + '_' + Math.random() * 100 + '_' + item.prompt + '.png'
    )
      .then(async ({ uri }) => {
        getPermissionTosaveImage(uri)

      })
      .catch(error => {
        console.error(error);
      });


    setModalVisible(!modalVisible);
  }

  const [fontsLoaded] = useFonts({
    'Nunito': require('../assets/fonts/Nunito-Medium.ttf'),
    'NunitoBold': require('../assets/fonts/Nunito-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{item?.prompt} </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>

              <View style={{ flexDirection: "row", alignItems: "center", marginRight: 50 }}>
                <Text style={styles.avatar} >{item?.name.charAt(0)} </Text>
                <Text style={{ fontFamily: "Nunito" }}>{item?.name} </Text>
              </View>

              <Pressable
                onPress={() => downloadImg(item.image)}
              >
                <AntDesign name='clouddownload' color="#2196F3" size={30} />
              </Pressable>

            </View>
          </View>
        </View>
      </Modal>
      <Pressable onLongPress={showMenu}>
        <Image source={{ uri: item.image }} style={[styles.image, { aspectRatio: 1 }]} />

      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    width: "100%",
  },
  container: {
    marginVertical: 5,
    padding: 5,
  },
  centeredView: {

    justifyContent: "center",
    alignItems: "center",

  },
  modalView: {
    margin: 35,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Nunito"
  },
  avatar: {
    backgroundColor: "#ff6666",
    borderRadius: 25,
    textAlign: "center",
    textAlignVertical: 'center',
    marginRight: 8,
    minHeight: 35,
    minWidth: 35,
    color: "#fff",
    fontFamily: "NunitoBold"
  }

});
export default Card