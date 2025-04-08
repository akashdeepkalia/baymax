import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { FC, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { usePedometerStore } from '../../state/pedometerStore'
import StepCounter, { parseStepData, startStepCounterUpdate, stopStepCounterUpdate } from '@dongminyu/react-native-step-counter'
import { playTTS } from '../../utils/ttsListenres'
import CircularProgress from 'react-native-circular-progress-indicator'
import { Fonts } from '../../utils/Constants'
import CustomText from '../global/CustomText'

const Pedometer :FC<{
  message: string;
  onCross: () => void;
}> = ({message, onCross}) => {

  const {stepCount, dailyGoal, addSteps} = usePedometerStore()
  
  StepCounter.addListener('StepCounter.stepsSensorInfo')

  const startStepCounter = () => {      // callback fxn
    startStepCounterUpdate(new Date(), (data)=>{
      const parsedData = parseStepData(data)
      addSteps(parsedData.steps, parsedData.distance)
    })
  }

  const stopStepCounter = () => {
    stopStepCounterUpdate()
  }
  
  useEffect(() => {
    console.log("outside return")
    if (stepCount > dailyGoal){
      playTTS("Congratulations! you hit your daily goal")
    } else{
      startStepCounter()
    }

    // cleanUp fxn
    return () => {
      console.log("inside return")
      stopStepCounter()
    }
  }, [])

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.cross} onPress={()=>{
        Alert.alert("Your step counter is stopped!")
        stopStepCounter()
        onCross()
        }}
        >
        <Icon name='close-circle' color='red' size={RFValue(20)} />
      </TouchableOpacity>

      <Image style={styles.logo} source={require('../../assets/images/logo_short.png')} />

      <View style={styles.indicator}>
        <CircularProgress 
          value={stepCount}
          maxValue={dailyGoal}
          valueSuffix='/2000'
          progressValueFontSize={22}
          radius={120}
          activeStrokeColor='#cdd27e'
          inActiveStrokeColor='#4c6394'
          inActiveStrokeWidth={20}
          activeStrokeWidth={20}
          title='Steps'
          titleColor='#555'
          titleFontSize={22}
          titleStyle={{fontFamily: Fonts.SemiBold}}
        />
        <CustomText fontSize={RFValue(8)} fontFamily={Fonts.SemiBold} style={styles.text}>
          Start Walking, counter will update automatically.
        </CustomText>
      </View>
    </View>
  )
}

export default Pedometer


const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '90%',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowOffset:{ width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.08,
    borderRadius: 16,
    elevation: 10,
  },
  text:{
    marginTop: 20,
    textAlign: 'center'
  },
  indicator:{
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  logo:{
    width: 50,
    height: 40,
    marginVertical: 10,
    alignSelf: 'center'
  },
  cross: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    shadowOffset:{ width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.08,
    elevation: 5,
  }
})