import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useActionState, useEffect} from 'react';
import {navigate, resetAndNavigate} from '../utils/NavigationUtils';
import {Colors, Fonts, lightColors} from '../utils/Constants';
import { screenHeight, screenWidth } from '../utils/Scaling';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../components/global/CustomText';
import LottieView from 'lottie-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { initializingTtsListener, playTTS } from '../utils/ttsListenres';
import Tts from 'react-native-tts';

const bottomColor = [...lightColors].reverse();

const SplashScreen = () => {
  // Animation
  const baymaxAnimation = useSharedValue(screenHeight * 0.8);
  const messageContainerAnimation = useSharedValue(screenHeight * 0.8);

  //Launch animation
  const lauchAnimation = async () => {
    messageContainerAnimation.value = screenHeight * 0.01;
    setTimeout(() => {
      playTTS("Hello world, I am Baymax!");
      baymaxAnimation.value = screenHeight * 0.02;
    }, 600);

    setTimeout(()=>{
      resetAndNavigate('BaymaxScreen');
    },4000)
  };

  useEffect(() => {
    initializingTtsListener()
    lauchAnimation();
  }, []);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: withTiming(baymaxAnimation.value, {duration: 1500})},
      ],
    };
  });

  const mesageContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(messageContainerAnimation.value, {
            duration: 1200,
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      
      {/* Image View */}
      <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
        <Image
          source={require('../assets/images/launch.png')}
          style={styles.img}
        />
      </Animated.View>

      {/* Text View */}
      <Animated.View style={[styles.gradientContainer, mesageContainerStyle]}>
        <LinearGradient colors={bottomColor} style={styles.gradient}>
          <View style={styles.textContainer}>
            <CustomText fontSize={34} fontFamily={Fonts.Theme}>
              BAYMAX!
            </CustomText>

            <LottieView
              source={require('../assets/animations/sync.json')}
              autoPlay={true}
              loop
              style={styles.lottie}
            />

            <CustomText>Synchronizing best configuration for you...</CustomText>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: Colors.primary,
  },

  imageContainer: {
    width: screenWidth - 20,
    height: screenHeight * 0.5, // half of the screen height
    // backgroundColor: "green"
  },

  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  gradientContainer: {
    position: 'absolute',
    height: '35%',
    bottom: 0,
    width: '100%',
    // backgroundColor: 'gray',
  },

  gradient: {
    width: '100%',
    height: '100%',
    paddingTop: 40,
  },

  textContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowColor: Colors.border,
  },

  lottie: {
    width: 280,
    height: 100,
  },
});
