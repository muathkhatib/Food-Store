/* eslint-disable import/namespace */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

import { theme } from "../constants";

import { LinearGradient } from "expo-linear-gradient";

const { SIZES, COLORS, FONTS } = theme;

interface ButtonProps {
  text?: string;
  onPress: () => void;
  icon?: JSX.Element;
  style?: object;
  textColor?: string;
  backgroundColor?: string;
  textStyle?: object;
  gradientColors?: any[];
}
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const GradientButton = ({
  text,
  onPress,
  icon,
  style,
  textColor,
  backgroundColor,
  textStyle,
  gradientColors = COLORS.gradientPrimary,
}: ButtonProps) => {
  const styles = StyleSheet.create({
    button: {
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      height: 40,
      padding: 8,
    },
    text: {
      color: textColor || "#fff",
      // fontSize: 14,
      textAlign: "center",
    },
    icon: {
      marginRight: 10,
    },
  });

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <AnimatedLinearGradient
        colors={gradientColors}
        style={[styles.button, style]}
      >
        {icon && <View style={styles.icon}>{icon}</View>}
        {text && (
          <Text style={[styles.text, FONTS.body3, textStyle]}>{text}</Text>
        )}
      </AnimatedLinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
