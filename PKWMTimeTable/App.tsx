import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Day, Timetable, WeekType} from './components/Timetable';
import {getData} from './script';

const PageTitleBar = () => {
  return (
    <View style={styles.pageTitleBar}>
      <Text style={styles.pageTitleBar_text}>Plan lekcji</Text>
    </View>
  );
};

type Data = {
  data: [];
  hours: [];
};

function App(): JSX.Element {
  const [day, setDay] = useState<Day>(Day.Monday);
  const [week, setWeek] = useState<WeekType>(WeekType.Odd);
  const [data, setData] = useState<Data>({data: [], hours: []});
  const backgroundStyle = {
    backgroundColor: '#222',
    flex: 1,
  };

  const loadData = () => {
    getData(setData);
  };

  useEffect(() => {
    loadData();
  }, []);

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
      <Timetable
        day={day}
        setDay={changeDay}
        weekType={week}
        hours={data.hours || []}
        subjects={data.data}
        loadData={loadData}
      />
    </SafeAreaView>
  );
}
// https://react-native-async-storage.github.io/async-storage/docs/usage
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
