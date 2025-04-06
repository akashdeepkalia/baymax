import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { circleRadius, Colors } from '../../utils/Constants'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useWaterStore } from '../../state/waterStore'
import { playTTS } from '../../utils/ttsListenres'
import { playSound } from '../../utils/voiceUtils'

const Water = () => {

  const {waterDrinkStamps, addWaterIntake} =  useWaterStore();
  const completedStamps = waterDrinkStamps.length
  const totalStamps = 8

  const constainerStyle = [
    styles.container,
    completedStamps === totalStamps && styles.containerCompleted,
  ]

  const handlePress = async () => {
    playSound("ting")
    if(completedStamps < totalStamps){
      const timestamp = new Date().toISOString()
      addWaterIntake(timestamp)
    }else{
      playTTS("Congrats! You have completed your daily water intake.")
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Icon name='water' color='#1ca3ec' size={RFValue(32)} />
      <View style={styles.segmentContainer}>
        {Array.from({length: totalStamps}).map((_,index) => (
          <View key={index} 
          style={[
            styles.segment, 
            {
              backgroundColor: completedStamps === totalStamps ? "#00D100" : index < completedStamps ? "#1ca3ec" : "#eee",
              transform: [
                { rotate : `${(index * 360)/totalStamps}deg`},
                { translateX: circleRadius / 2 - 5} // 2-5 adds little padding to the circle
              ]      
            }
          ]} 
          />
        ))}
      </View>
    </TouchableOpacity>
  )
}

export default Water

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        padding: 14, 
        width: circleRadius,
        height: circleRadius,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: circleRadius,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 1
    },
    containerCompleted: {
      shadowColor: 'yellow',
      elevation: 10
    },
    segmentContainer: {
      position : 'absolute',
      height: circleRadius,
      width: circleRadius,
      borderRadius: circleRadius/2,
      justifyContent: 'center',
      alignItems: 'center',

    },
    segment: {
      position : 'absolute',
      width: 8,
      height: 4,
      borderRadius: 2,
    },

})