/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Settings from './components/Settings';
import {Day, Timetable, WeekType} from './components/Timetable';
import {getData} from './script';
type Data = {
  data: [];
  hours: [];
};

const Home = () => {
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
};

const SettingsIcon = () => {
  return (
    <View
      style={{
        width: 50,
        borderWidth: 1,
        borderColor: 'transparent',
      }}>
      <View style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() =>
            Navigation.push('settingsIcon', {
              component: {
                name: 'Settings',
              },
            }).catch(e => console.log(e))
          }>
          <Image
            style={{width: 25, resizeMode: 'contain'}}
            source={require('./assets/icons/settings.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

Home.options = {
  topBar: {
    rightButtons: [
      {
        id: 'id',
        text: 'Button',
        component: {
          name: 'settingsIcon',
        },
      },
    ],
    title: {
      text: 'Plan Lekcji',
      color: '#fff',
      alignment: 'center',
      fontSize: 25,
    },
    background: {
      color: '#000',
    },
    height: 60,
  },
};

Settings.options = {
  topBar: {
    title: {
      text: 'Ustawienia',
      color: '#fff',
      alignment: 'center',
      fontSize: 25,
    },
    background: {
      color: '#000',
    },
    height: 60,
    backButton: {
      color: '#fff',
    },
  },
};

const start = () => {
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Settings', () => Settings);
  Navigation.registerComponent('settingsIcon', () => SettingsIcon);
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                id: 'settingsIcon',
                name: 'settingsIcon',
              },
            },
            {
              component: {
                id: 'Settings',
                name: 'Settings',
              },
            },
            {
              component: {
                id: 'Home',
                name: 'Home',
              },
            },
          ],
        },
      },
    });
  });
};

export default start;
// https://react-native-async-storage.github.io/async-storage/docs/usage
