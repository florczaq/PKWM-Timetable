/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Timetable, Day, WeekType} from './components/Timetable';

const PageTitleBar = () => {
  return (
    <View style={styles.pageTitleBar}>
      <Text style={styles.pageTitleBar_text}>Plan lekcji</Text>
    </View>
  );
};

function App(): JSX.Element {
  const [day, setDay] = useState<Day>(Day.Monday);
  const [week, setWeek] = useState<WeekType>(WeekType.Odd);
  const backgroundStyle = {
    backgroundColor: '#222',
    flex: 1,
  };

  const changeDay = (newDay: Day, newWeek: WeekType) => {
    setDay(newDay);
    setWeek(newWeek);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <PageTitleBar />
      <Timetable day={day} setDay={changeDay} weekType={week} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageTitleBar: {
    width: '100%',
    height: '10%',
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitleBar_text: {
    fontSize: 30,
    color: '#fff',
  },
});

export default App;
