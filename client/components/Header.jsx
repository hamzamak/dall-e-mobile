import { View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from '../assets/logo.png'
const Header = () => {
    return (
        <SafeAreaView>
            <View>
               <Image source={logo} style={{height : 60 , width : 120 }} />
            </View>
        </SafeAreaView>
    )
}

export default Header