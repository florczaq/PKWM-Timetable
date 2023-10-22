/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const data : string[] = [
    'Option1',
    'Option2',
    'Option3',
    'Option4',
]

const SideMenu = () => {
  return (
    <View>
      <Text style={style.container}>SideMenu</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    color: '#fff',
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: 'red',
    height: Dimensions.get('window').height,
    left: 0,
    top: 0,
  },
});

export default SideMenu;
