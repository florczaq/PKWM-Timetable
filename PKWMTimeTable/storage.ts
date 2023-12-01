/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Day, WeekType} from './components/Timetable';

export type StoreDataType = {
  data: {oddzial: string; grupa_K: string; grupa_L: string};
};

export const storeData = async (value: StoreDataType) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('my-key', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const storeDay = async (day: Day, week: WeekType) => {
  try {
    const jsonValue = JSON.stringify({day, week});
    await AsyncStorage.setItem('my-day', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const getDay = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-day');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};


export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};
