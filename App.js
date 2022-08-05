import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import ChatScreen from "./screens/ChatScreen";
import POIScreen from "./screens/POIScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import userName from "./reducers/userName.reducer";
import socket from "./reducers/socket.reducer";
import messageList from "./reducers/messageList.reducer";

import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Provider } from "react-redux";

import { createStore, combineReducers } from "redux";

import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

const store = createStore(combineReducers({ userName, socket, messageList }));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabsGenerator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Map") {
            iconName = "ios-navigate";
            return <Ionicons name={iconName} size={25} color={color} />;
          } else if (route.name === "Chat") {
            iconName = "ios-chatbubbles";
            return <Ionicons name={iconName} size={25} color={color} />;
          } else if (route.name === "POI") {
            iconName = "map-marker";
            return <FontAwesome name={iconName} size={25} color={color} />;
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#eb4d4b",
        inactiveTintColor: "#FFFFFF",
        style: { backgroundColor: "#130f40" },
      }}
    >
      <Tab.Screen name="Lobbies" component={POIScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Map" component={TabsGenerator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
