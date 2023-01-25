import { View, Text, StyleSheet, Image, ActivityIndicator, Pressable, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from 'expo-font';
import FormField from '../components/FormField';
import preview from '../assets/preview.png'
import { getRandomPrompt } from '../utils';
import { Ionicons } from '@expo/vector-icons' 
const Create = ({ navigation }) => {
    const baseUrl = "http://192.168.1.104:9000" 

    const [name, setName] = useState('')
    const [prompt, setPrompt] = useState('')
    const [image, setImage] = useState('')
    const [generatingImg, setGeneratingImg] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleGenerateImg = async () => {
        if (prompt) {
            setGeneratingImg(true)
            try {
                const response = await fetch(`${baseUrl}/api/dalle`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: prompt })
                })

                const data = await response.json()
                setImage(`data:image/jpeg;base64,${data.image}`)

            } catch (error) {
                console.log(error.message)

            } finally {
                setGeneratingImg(false)
            }
        }
        else {
            Alert.alert('missing fields', 'Entre a prompt')
        }

    }

    const handleShare = async () => {
        if (prompt && image && name) {
            setLoading(true)
            try {
                const response = await fetch(`${baseUrl}/api/post`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, prompt, image })
                })

                await response.json()
                navigation.navigate('Home')

            } catch (error) {
                Alert.alert('error', error)

            } finally {
                setLoading(false)
                setName('')
                setPrompt('')
                setImage('')
            }

        }
        else {
            Alert.alert('missing fields', 'Entre a prompt and name')
        }
    }

    const handleSupriseMeEvent = () => {
        const randomPrompt = getRandomPrompt(prompt)
        setPrompt(randomPrompt)
    }

    const clear = () => {
        setLoading(false)
        setName('')
        setPrompt('')
        setImage('')
    }

    const [fontsLoaded] = useFonts({
        'Nunito': require('../assets/fonts/Nunito-Medium.ttf'),
        'NunitoBold': require('../assets/fonts/Nunito-Bold.ttf'),
    });
    if (!fontsLoaded) {
        return null;
    }


    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <View style={styles.title_reload}>
                <Text style={styles.title1}>Create</Text>
                <TouchableOpacity onPress={clear}>
                        <Ionicons name="reload" size={22} color="#4d4dff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.title2}>Create imaginative and visually stunning images through DALL-E and share them with the Community </Text>
            </View>


            <FormField value={name} handleChange={setName} label="Your Name" placeholder="Hamza" />

            <FormField value={prompt} handleChange={setPrompt} label="Prompt" placeholder="a painting of a fox in the style of Starry Night"
                supriseMe={image ? false : true} handleSupriseMe={handleSupriseMeEvent} editable={image ? false : true} />

            <View style={styles.generateImgView}>

                <View style={styles.ImageContainer}>
                    {
                        image ? (
                            <Image source={{ uri: image }} style={{ width: 200, height: 200, resizeMode: 'cover', borderRadius: 5 }} />
                        ) :
                            (
                                <Image source={preview} alt="preview" style={[styles.img]} />
                            )
                    }
                    {
                        generatingImg && (
                            <View style={styles.generate} >
                                <ActivityIndicator size="large" color="#00ff00" />
                            </View>
                        )
                    }
                </View>

                <Pressable style={[styles.btn, { backgroundColor: "#15803d" }]} onPress={handleGenerateImg} >
                    <Text style={{ color: "white", fontFamily: "Nunito" }}>
                        {
                            generatingImg ? 'Generating...' : 'Generate'
                        }
                    </Text>
                </Pressable>

            </View>

            <View>
                <Text style={[styles.title2, { marginBottom: 12 }]}>Once you have created the image you want , you can share it with others in the Community</Text>
                <Pressable style={[styles.btn, { backgroundColor: "#4d4dff" }, { width: 220 }, { marginBottom: 10 }]} onPress={handleShare} >
                    <Text style={{ color: "white", fontFamily: "Nunito" }}>
                        {
                            loading ? 'Sharing...' : 'Share with the Community'
                        }
                    </Text>
                </Pressable>


            </View>
        </ScrollView>
    )
}
export const styles = StyleSheet.create({
    mainContainer: {
        padding: 10,

    },
    title_reload : {
     display : "flex",
     flexDirection : "row",
     justifyContent: "space-between",
     alignItems: "center",
     marginVertical : 4
    },
    titleContainer: {
        marginVertical: 5,
        marginBottom: 15,
    },
    title1: {
        fontFamily: "NunitoBold",
        fontSize: 21
    },
    title2: {
        fontFamily: "Nunito",
        fontSize: 13,

    },
    generateImgView: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: 5,
        marginBottom: 10

    },
    img: {
        opacity: 0.5,
        width: 200 * 0.85,
        height: 200 * 0.85,
    },
    ImageContainer: {
        position: "relative",
        width: 200,
        height: 200,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        marginTop: 8,
        borderRadius: 10,
        borderWidth: 1,

    },
    generate: {
        position: "absolute",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 0
    },
    btn: {

        padding: 10,
        paddingHorizontal: 16,
        borderRadius: 5,
    },


})

export default Create