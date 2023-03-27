import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'star-sharp' : 'star-outline';
          } else if (route.name === 'Track Orders') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'reorder-three' : 'reorder-three-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray'
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={StackNavigator} />
      <Tab.Screen name="Favourites" component={HomeScreen} />
      <Tab.Screen name="Track Orders" component={HomeScreen} />
      <Tab.Screen name="More" component={HomeScreen} />
    </Tab.Navigator>
  )
}