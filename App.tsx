

import { View, Text, StatusBar } from 'react-native'

import React from 'react'
import Navigation from './src/navigation/Navigation'

const App = () => {
  return (
    <>
      <Navigation />
      <StatusBar hidden />
    </>

  )
}

export default App