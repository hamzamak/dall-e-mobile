import { Ionicons,MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import Header from './components/Header';
import Create from './screens/Create';
export default function App() {

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer >
      <Header />
      <Tab.Navigator initialRouteName="Home"
      sceneContainerStyle= {{
        backgroundColor :"#f9fafe"
      }}
      
      
      screenOptions = {{
        tabBarLabelStyle : {
          fontFamily :"NunitoBold", 
        },
        headerShown : false,
        tabBarHideOnKeyboard : true,
        tabBarStyle : {
          borderTopStartRadius : 15,
          borderTopEndRadius :15
        },
        
      }} >
        <Tab.Screen name="Home" component={Home}  options={{
          
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-home"
                size={24}
                color={tabInfo.color }
              />
            );
          },

        }} />
        <Tab.Screen name="Create" component={Create} options={{
          tabBarIcon: (tabInfo) => {
            return (
              <MaterialIcons
                name="image"
                size={24}
                color={tabInfo.color }
              />
            );
          },
          tabBarColor: "red",

        }}  />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

