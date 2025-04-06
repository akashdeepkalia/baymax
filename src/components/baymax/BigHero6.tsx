import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import { bigHero6Data } from '../../utils/data'
import Water from '../options/Water'
import OptionItem from '../options/OptionItem'

const BigHero6: FC<{
    onPress:(type: string)=>void
}> = ({onPress}) => {

    const animatedValues = useRef([...Array(6)].map(()=>new Animated.Value(0))).current
    // [...Array(6)] → Spreads the array to ensure it has actual elements inside (otherwise, .map() wouldn’t work). .map(() => new Animated.Value(0)) → Creates an Animated.Value(0) for each element, so you end up with an array of 6 animated values.
    // [ undefined, undefined, undefined, undefined, undefined, undefined ]

    useEffect(()=>{
        Animated.stagger(100, 
            animatedValues.map((animatedValue, index)=>
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                delay: index * 200
            })
        )).start()
    }, []);

  return (
    <View style={styles.circle}>
      {
        bigHero6Data.map((item, index)=>{

            const angle = (index/6) * 2 * Math.PI   // It is in radians
            const x = screenWidth*0.38 * Math.cos(angle) //0.38 is hit & trail for adjustments
            const y = screenWidth*0.38 * Math.sin(angle) //Sine (Math.sin(angle)) helps find the vertical (Y) position of the item in a circle.

            const translateX = animatedValues[index].interpolate({  //🔹 Think of it like a progress bar:
                inputRange: [0, 1], // 0 means start, 1 means end
                outputRange: [0, x], // Moves from 0 to x
            })

            const translateY = animatedValues[index].interpolate({  // interpolate 4 Smooth Movement
                inputRange: [0, 1],
                outputRange: [0, y],
            })

            return (
                <Animated.View style={[styles.item, { transform:[
                    {translateX},
                    {translateY}
                ] } ]} 
                key={index}
                > 
                    {
                        item !== 'water' && <OptionItem item={item} onPress={onPress} />
                    }
                    {
                        item === 'water' && <Water />
                    }
                </Animated.View>
            )
        })

      }
    </View>
  )
}

export default BigHero6

const styles = StyleSheet.create({

    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },

    circle: {
        width: screenWidth * 0.8,
        height: screenHeight * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    item: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 400
    }
})