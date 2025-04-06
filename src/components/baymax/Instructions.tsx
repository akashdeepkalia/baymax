import { View, Text, StyleSheet, Touchable, TouchableOpacity, Image } from 'react-native'
import React, {FC} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import LottieView from 'lottie-react-native'
import Markdown from 'react-native-markdown-display';
import { Fonts } from '../../utils/Constants'

const Instructions:FC<{
  message: string;
  onCross: () => void;
}> = ({message, onCross}) => {
  console.log("message in Instructions :", message)
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.cross} onPress={onCross}>
        <Icon name='close-circle' color='red' size={RFValue(20)} />
      </TouchableOpacity>

      <Image style={styles.logo} source={require('../../assets/images/logo_short.png')} />

      <View>
        { 
        message === 'meditation' ? 
        <LottieView
          source={require('../../assets/animations/breath.json')}
          style={{height:400, alignItems:'center', justifyContent: 'center'}}
          autoPlay
          loop
        /> 
        : <Markdown style={{
          body:{
            fontFamily: Fonts.Theme,
            padding: 20,
            fontSize: RFValue(22),
          }
        }}>
          {message}
        </Markdown>
        }
      </View>
 </View>
  )
} 

export default Instructions

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