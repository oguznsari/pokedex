import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import HomeScreen from "./src/features/HomeScreen";
import SettingsScreen from "./src/features/Settings";
import { Provider } from "react-redux";
import store from "./src/app/store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddScreen from "./src/features/AddScreen";
import LoginScreen from "./src/features/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "./src/app/services/firebase";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("email").then((email) => {
      if (email) {
        setAuthenticated(true);
        navigation.navigate("HomeStack");
      }
    });
  }, [auth]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
          ></Stack.Screen>

          <>
            <Stack.Screen
              name="HomeStack"
              options={{
                headerShown: false,
              }}
            >
              {() => (
                <Tab.Navigator>
                  <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                      tabBarLabel: "Anasayfa",
                      tabBarIcon: ({ color, size }) => (
                        <Feather name="home" size={size} color={color} />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                      tabBarLabel: "Ayarlar",
                      tabBarIcon: ({ color, size }) => (
                        <Feather name="settings" size={size} color={color} />
                      ),
                    }}
                  />
                </Tab.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Add"
              component={AddScreen}
              options={{ presentation: "modal" }}
            ></Stack.Screen>
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
