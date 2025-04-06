import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { circleRadius } from '../../utils/Constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';

const OptionItem: FC<{
    item: any,
    onPress: (type: string) => void
}> = ({item, onPress}) => {

    let iconName;
    let iconColor;

    switch(item){
        case 'meditation':
            iconName = 'nature-people';
            iconColor = '#2DEC72';
            break;
        case 'pedometer':
            iconName = 'directions-run';
            iconColor = '#2D7BA4';
            break;
        case 'health':
            iconName = 'health-and-safety';
            iconColor = 'green';
            break;
        case 'happiness':
            iconName = 'emoji-emotions';
            iconColor = '#FB26FF';
            break;
        default:
            iconName = 'local-fire-department';
            iconColor = '#FFBC66';
            break;
    }

  return (
    <TouchableOpacity style={styles.container} onPress={()=>onPress(item)}>
      <Icon name={iconName} color={iconColor} size={RFValue(32)} />
    </TouchableOpacity>
  )
}

export default OptionItem

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
})