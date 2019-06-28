import { createStackNavigator, createAppContainer } from "react-navigation";
import MapScreen from '../screens/mapScreen'
import ChatRoomScreen from '../screens/chatRoomDetail'
import MyDrawerNavigator from './DrawerNavigation'
import { Text,Image} from 'react-native'
import React from 'react'
import { TouchableOpacity } from "react-native-gesture-handler";

const mainScreenNavigation = createStackNavigator(
    {
        MyDrawerNavigator: {
            screen: MyDrawerNavigator,
            navigationOptions: ({ navigation, screenProps }) => ({
                headerStyle:{
                    backgroundColor:'#ff9317'
                },
            })
        },
        
        //Add New Screen Here
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: 'green' },
            title: (navigation.state.index) ? '聊天室' : '地圖',
            gesturesEnabled: false,
            headerLeft: <TouchableOpacity onPress={() => {
                console.log(navigation.state)
                if (!navigation.state.isDrawerOpen) {
                    navigation.openDrawer();
                } else {
                    navigation.closeDrawer();
                }
            }}><Image style={{marginLeft:10,width:20,height:20}} source={require('../assets/icon/drawer.png')}/></TouchableOpacity>
        })
    });



export default createAppContainer(mainScreenNavigation);
