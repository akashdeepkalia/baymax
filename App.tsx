

import { View, Text, StatusBar, Platform } from 'react-native'

import React, { useEffect } from 'react'
import Navigation from './src/navigation/Navigation'
import { batteryOptimizationCheck, powerManagerCheck, requestPermission } from './src/notification/notificationPermission'
import './src/notification/notificationListner'
import { registerAllTriggers } from './src/notification/registerTriggers'
import { setCategory } from './src/notification/notificationInitial'

const App = () => {

  const pemissonCheck = async () => {
    requestPermission()
    registerAllTriggers()
    setCategory()
    if(Platform.OS === 'android'){
      batteryOptimizationCheck()
      powerManagerCheck()
    }
  }

  useEffect(()=>{pemissonCheck()},[])


  return (
    <>
      <Navigation />
      <StatusBar hidden />
    </>

  )
}

export default App