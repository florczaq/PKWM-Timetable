/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StoreDataType} from '../storage';

type SettingsIcon = {
  openModal: () => void;
};

const SettingsIcon = ({openModal}: SettingsIcon) => {
  return (
    <View style={styles.button}>
      <View style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => openModal()}>
          <Image
            style={{width: 25, resizeMode: 'contain'}}
            source={require('../assets/icons/settings.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

type TopBar = {
  title: string;
  storageData: StoreDataType;
  openModal: () => void;
};
//TODO get rid of ustawienia dependecy
const TopBar = ({title = 'Title', openModal}: TopBar) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      {title === 'Plan Lekcji' && <SettingsIcon openModal={openModal} />}
      {title === 'Ustawienia' && <SettingsIcon openModal={openModal} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 30,
  },
  button: {
    position: 'absolute',
    right: 15,
    width: '15%',
  },
});

export default TopBar;
