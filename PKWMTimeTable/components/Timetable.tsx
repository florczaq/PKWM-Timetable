/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const hours: string[] = [
  '7:30 - 8:15',
  '8:15 - 9:00',
  '9:15 - 10:00',
  '10:00 - 10:45',
  '11:00 - 11:45',
  '11:45 - 12:30',
  '12:45 - 13:30',
  '13:30 - 14:15',
  '14:30 - 15:15',
  '15:15 - 16:00',
  '16:15 - 17:00',
  '17:00 - 17:45',
  '18:00 - 18:45',
  '18:45 - 19:30',
  '19:45 - 20:30',
  '20:30 - 21:15',
];

const data: string[] = [
  'Subject1 C01',
  'Subject2 C02',
  'Subject3 K333',
  '',
  '',
  'Subject4 K444',
  'Subject5 K444',
  'Subject6 K444',
  'Subject7 K444',
  'Subject8 K444',
  'Subject9 K444',
  'Subject10 K444',
  'Subject11 K444',
  'Subject12 K444',
  'Subject13 K444',
  'Subject14 K444',
];

const DayBar = () => {
  return (
    <View style={style.dayBar}>
      <TouchableOpacity style={style.dayBar_button}>
        <Text style={[style.dayBar_text, {fontSize: 30}]}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={style.dayBar_text}>Poniedziałek (N)</Text>
      <TouchableOpacity style={style.dayBar_button}>
        <Text style={[style.dayBar_text, , {fontSize: 30}]}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const SubjectsList = () => {
  return (
    <ScrollView>
      <View>
        {data.map((element, i) => {
          return (
            <View style={style.subject} key={i}>
              <View style={style.subject_hour}>
                <Text style={style.text}>{hours[i]}</Text>
              </View>
              <View style={style.subject_name}>
                <Text key={i} style={style.text}>
                  {element}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export const Timetable = () => {
  return (
    <>
      <DayBar />
      <SubjectsList />
    </>
  );
};

const style = StyleSheet.create({
  dayBar: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 70,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  dayBar_text: {
    width: '60%',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  dayBar_button: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  subject: {
    borderBottomWidth: 1,
    width: '100%',
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subject_hour: {
    width: '25%',
  },
  subject_name: {
    width: '75%',
  },
});
