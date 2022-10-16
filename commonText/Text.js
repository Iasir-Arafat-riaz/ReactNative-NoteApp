import { View, Text as RnText, StyleSheet } from 'react-native'
import React from 'react'
import { TextPresets } from './textPreset'

export default function Text({children,preset="default",style}) {
  const textStyle= StyleSheet.compose(TextPresets[preset],style)
  return (
    <RnText style={textStyle}>{children}</RnText>
  )
}