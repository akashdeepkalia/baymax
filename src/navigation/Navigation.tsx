import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import BaymaxScreen from '../screens/BaymaxScreen';
import {navigationRef} from '../utils/NavigationUtils';

const Navigation: FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" 
        component={SplashScreen} />
        <Stack.Screen name="BaymaxScreen"
            options={{animation: 'flip'}}
            component={BaymaxScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
