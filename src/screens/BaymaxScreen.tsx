import { View, Text, StyleSheet, Animated, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../utils/Constants'
import Background from '../components/baymax/Background'
import Loading from '../components/baymax/Loading'
import BigHero6 from '../components/baymax/BigHero6'
import { playTTS } from '../utils/ttsListenres'
import SoundPlayer from 'react-native-sound-player'
import { prompt } from '../utils/data'
import Instructions from '../components/baymax/Instructions'
import Pedometer from '../components/pedometer/Pedometer'
import { playSound } from '../utils/voiceUtils'
import { askAI } from '../service/apiService'


const BaymaxScreen = () => {

  const bO = useRef(new Animated.Value(0)).current

  const [showInstructions, setShowInstructions] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [message, setMessage] = useState('');
  const [showPedometer, setShowPedometer] = useState(false);
  
  const startBlur = () =>{
    Animated.timing(bO, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => console.log("Animation completed"));
  }

  const stopBlur = () => {
    Animated.timing(bO, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }

  useEffect(()=>{
    console.log("showLoader:", showLoader);
    const timer = setTimeout(startBlur, 500);
    return () => clearTimeout(timer);
  },[])

  const handleError = (err: string) => {
    playTTS("There was an error, please try again")
    startBlur();
    setMessage(err);
    setShowLoader(true);
    setShowInstructions(false);
    SoundPlayer.stop();
    console.log(err);
  };

  const handleResponse = async(
    type: string,
    promptText: string,
    sound: string,
  ) => {
    setShowLoader(true);
    try {
      if(type === "meditation"){
        playTTS("Focus on your breath")
        playSound(sound);
        setMessage("meditation")
        return
      }

      const data = await askAI(promptText)
      console.log("joke data is : ", data);
      setMessage(data);
      playTTS(data);

      if(type === "happiness"){
        setTimeout(()=>{
          playSound(sound);
        },8000)
      }else{
        playSound(sound);
      }

      // setMessage(type)
      stopBlur()
    } catch (error: any) {
      handleError(error);
    }
    finally{
      setShowLoader(false);
    }
  }

  const onOptionPressHandler = (type: string) => {
    setShowInstructions(true);
    if (type === 'pedometer') {
      setShowPedometer(true);
      setShowLoader(false);
      return
    }
    switch (type) {
      case 'happiness':
      handleResponse(type, prompt.joke, 'laugh')  
      break;
      case 'motivation':
      handleResponse(type, prompt.motivation, 'motivation')  
      break;
      case 'meditation':
      handleResponse(type, prompt.health, 'meditation')   
      break;
      case 'health':
      handleResponse(type, prompt.health, 'meditation')   
      break;

    }
  }

  return (
    <View style={style.container}>

      {message && (
        <Instructions
          onCross={()=>{
            startBlur();
            setMessage('');
            setShowInstructions(false);
            setShowLoader(true);
            SoundPlayer.stop();
          }}
          message={message}
          />
      )
    }

      
      {showPedometer && (
        <Pedometer
          onCross={()=>{
            startBlur();
            setMessage('');
            setShowPedometer(false);
            setShowInstructions(false);
            setShowLoader(true);
            SoundPlayer.stop();
          }}
          message={message}
          />
      )}

      {showLoader &&
        <View style={style.loaderContainer}>
          <Loading />
        </View>
      }

      {!showInstructions &&
        <BigHero6 onPress={onOptionPressHandler} />
      }

      {/* {!showPedometer &&
        <BigHero6 onPress={onOptionPressHandler} />
      } */}

      <Background blurOpacity={bO}/>
    </View>
  )
}


export default BaymaxScreen

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondry,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0
  },
  
  loaderContainer: {
    position: 'absolute',
  },
})