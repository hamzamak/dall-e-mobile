import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
const FormField = ({ value, handleChange, placeholder, label, supriseMe, handleSupriseMe, editable = true }) => {
    const [fontsLoaded] = useFonts({
        'Nunito': require('../assets/fonts/Nunito-Medium.ttf'),
        'NunitoBold': require('../assets/fonts/Nunito-Bold.ttf'),
    });
    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            <View style={styles.labelView}>

                <Text style={{ fontFamily: "Nunito" }} >{label} </Text>
                {
                    supriseMe && (
                        <TouchableOpacity style={styles.supriseMeButton} onPress={handleSupriseMe}>
                            <Text style={styles.supriseMeLabel}>Suprise Me</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <TextInput value={value} onChangeText={handleChange} placeholder={placeholder} style={styles.input} multiline editable={editable} maxLength={130} />
        </View>
    )
}
export const styles = StyleSheet.create({
    container: {
        fontFamily: "Nunito",
        marginVertical: 5,
    },
    
    labelView: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"

    },
    input: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#000",
        padding: 6,
        borderRadius: 6,
        fontFamily: "Nunito",
    },
    supriseMeButton: {
        // borderWidth : 1 ,
        // borderColor : "#000",
        padding: 5,
        paddingHorizontal: 8,
        borderRadius: 7,
        backgroundColor: "gray",
        // marginLeft : 12,
    },
    supriseMeLabel: {
        color: "#fff",
        fontFamily: "Nunito",
    }
})
export default FormField