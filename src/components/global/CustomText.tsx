import { View, Text, TextStyle, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Fonts } from '../../utils/Constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RFValue} from 'react-native-responsive-fontsize';
interface Props{
    variant?: 
    "h1"|
    "h2"|
    "h3"|
    "h4"|
    "h5"|
    "h6"|
    "h7"|
    "h8"|
    "h9"|
    "body";
    fontFamily?: Fonts;
    fontSize?: number;
    children?: React.ReactNode;
    style?: TextStyle | TextStyle[];
    numberOfLines?: number;
    onLayout?:(event: object) => void;

}

const CustomText:FC<Props> = ({
    variant = "body",
    fontFamily = Fonts.Regular,
    fontSize,
    children,
    style,
    numberOfLines,
    onLayout,
    ...props
}) => {

    let computedFontSize:number;
    switch(variant) {
        case "h1":
            computedFontSize = RFValue(fontSize || 22);
            break;
        case "h2":
            computedFontSize = RFValue(fontSize || 22);
            break;
        case "h3":
            computedFontSize = RFValue(fontSize || 22);
            break;
        case "h4":
            computedFontSize = RFValue(fontSize || 22);
            break;
        case "h5":
            computedFontSize = RFValue(fontSize || 14);
            break;
        case "h6":
            computedFontSize = RFValue(fontSize || 12);
            break;
        case "h7":
            computedFontSize = RFValue(fontSize || 11);
            break;
        case "h8":
            computedFontSize = RFValue(fontSize || 10);
            break;
        case "h9":
            computedFontSize = RFValue(fontSize || 9);
            break;
        case "body":
            computedFontSize = RFValue(fontSize || 12);
            break;
        default:
            computedFontSize = RFValue(fontSize || 32);
    }

  return (
      <Text onLayout={onLayout} style={[styles.text,
        {
            fontSize: computedFontSize, 
            fontFamily: fontFamily,
            color: Colors.text
        },
        style
        ]}  
        numberOfLines = {numberOfLines !== undefined ? numberOfLines : undefined}
        {...props}
        >
        {children}
      </Text>
    
  )
}

export default CustomText

const styles = StyleSheet.create({
    text:{
        textAlign: 'left',
    }
});