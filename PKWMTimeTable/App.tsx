/* eslint-disable curly */
import React, {useEffect, useState} from 'react';
import {Modal, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Settings, {filterOptionList} from './components/Settings';
import {Day, Timetable, WeekType} from './components/Timetable';
import TopBar from './components/TopBar';
import {getData} from './script';
import {
  StoreDataType,
  getDay,
  getData as getStorageData,
  storeData,
  storeDay,
} from './storage';

type Data = {
  data: [];
  hours: [];
};

const Home = () => {
  const [day, setDay] = useState<Day>(Day.Monday);
  const [week, setWeek] = useState<WeekType>(WeekType.Odd);
  const [tt_data, setData] = useState<Data>({data: [], hours: []});
  const [filterData, setFilterData] = useState<StoreDataType>({
    data: {
      oddzial: '',
      grupa_K: filterOptionList.grupa_K_list[0],
      grupa_L: filterOptionList.grupa_L_list[0],
      grupa_P: filterOptionList.grupa_P_list[0],
    },
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const backgroundStyle = {
    backgroundColor: '#222',
    flex: 1,
  };

  const loadData = () => getData(setData, filterData.data.oddzial);

  useEffect(() => {
    getData(setData, filterData.data.oddzial);
    getDay().then(res => {
      if (res != null) {
        setDay(res.day);
        setWeek(res.week);
      }
    });
    getStorageData()
      .then(res => {
        if (res != null) setFilterData(res);
      })
      .catch(e => console.error(e));
  }, [filterData.data.oddzial]);

  const closeModal = (newFilterData: StoreDataType) => {
    setModalVisible(false);
    setFilterData(newFilterData);
    storeData(newFilterData);
  };

  const changeDay = (newDay: Day, newWeek: WeekType) => {
    setDay(newDay);
    setWeek(newWeek);
    storeDay(newDay, newWeek);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TopBar
        title="Plan Lekcji"
        storageData={filterData}
        openModal={() => setModalVisible(true)}
      />
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent
        onRequestClose={() => console.log('close')}>
        <View style={styles.modal}>
          <Settings closeModal={closeModal} filterData={filterData} />
        </View>
      </Modal>
      <Timetable
        day={day}
        setDay={changeDay}
        weekType={week}
        hours={tt_data.hours || []}
        subjects={tt_data.data}
        loadData={loadData}
        filterOptions={filterData}
      />
    </SafeAreaView>
  );
};

Home.options = {
  topBar: {
    visible: false,
  },
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30,30,30,0.5)',
  },
});

const start = () => {
  Navigation.registerComponent('Home', () => Home);
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
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
