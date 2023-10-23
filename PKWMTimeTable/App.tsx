/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Timetable, Day} from './components/Timetable';

const PageTitleBar = () => {
  return (
    <View style={styles.pageTitleBar}>
      <Text style={styles.pageTitleBar_text}>Plan lekcji</Text>
    </View>
  );
};

function App(): JSX.Element {
  const [day, setDay] = useState<Day>(Day.Monday);
  const backgroundStyle = {
    backgroundColor: Colors.darker,
    flex: 1,
  };

  const changeDay = (newDay: Day) => {
    setDay(newDay);
    console.log(day);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <PageTitleBar />
      <Timetable day={day} setDay={changeDay} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageTitleBar: {
    width: '100%',
    height: '10%',
    borderBottomWidth: 1,
    borderColor: '#000',

    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitleBar_text: {
    fontSize: 30,
    color: '#fff',
  },
});

export default App;
