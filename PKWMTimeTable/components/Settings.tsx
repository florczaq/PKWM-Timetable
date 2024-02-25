/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {StoreDataType} from '../storage';
import {getOdzialList} from '../script';

export const filterOptionList = {
  grupa_L_list: ['L01', 'L02', 'L03', 'L04', 'L05', 'L06'],
  grupa_K_list: ['K01', 'K02', 'K03', 'K04', 'K05', 'K06'],
  grupa_P_list: ['P01', 'P02', 'P03', 'P04', 'P05', 'P06'],
};

type SelectList = {
  data: string[];
  setValue: (label: string, value: string) => void;
  value: string;
  label: string;
};

const SelectList = ({data, setValue, value, label}: SelectList) => {
  return (
    <View style={styles.optionSelectList}>
      <Dropdown
        data={data.map(e => {
          return {label: e, value: e};
        })}
        labelField={'label'}
        valueField={'value'}
        placeholder="Oddział"
        onChange={v => {
          setValue(label, v.value);
        }}
        containerStyle={{backgroundColor: '#333'}}
        itemTextStyle={{textAlign: 'center', color: '#fff'}}
        activeColor="transparent"
        value={value}
        placeholderStyle={{textAlign: 'center', color: '#fff'}}
        selectedTextStyle={{textAlign: 'center', color: '#fff'}}
        maxHeight={200}
        dropdownPosition="bottom"
        autoScroll={false}
      />
    </View>
  );
};

type Settings = {
  closeModal: (newFilterData: StoreDataType) => void;
  filterData: StoreDataType;
};

const Settings = ({closeModal, filterData}: Settings) => {
  const [activeOptions, setActiveOptions] = useState<StoreDataType>(filterData);
  const [oddzialList, setOddzialList] = useState([]);

  useEffect(() => {
    getOdzialList
      .then((res: any) => {
        //REDO get rid off temporary variable
        let temp: any = [];
        temp = res.map((e: any) => e.name);
        setOddzialList(temp);
      })
      .catch(err => console.error(3, err.message));
  }, []);

  //REDO pass whole data set and make changes on it, get rid of big swtich case
  const onDataChange = (label: string, newValue: string) => {
    switch (label) {
      case 'oddzial':
        setActiveOptions({
          data: {
            oddzial: newValue,
            grupa_K: activeOptions.data.grupa_K,
            grupa_L: activeOptions.data.grupa_L,
            grupa_P: activeOptions.data.grupa_P,
          },
        });
        break;
      case 'grupa_K':
        setActiveOptions({
          data: {
            oddzial: activeOptions.data.oddzial,
            grupa_K: newValue,
            grupa_L: activeOptions.data.grupa_L,
            grupa_P: activeOptions.data.grupa_P,
          },
        });
        break;
      case 'grupa_L':
        setActiveOptions({
          data: {
            oddzial: activeOptions.data.oddzial,
            grupa_K: activeOptions.data.grupa_K,
            grupa_L: newValue,
            grupa_P: activeOptions.data.grupa_P,
          },
        });
        break;
      case 'grupa_P':
        setActiveOptions({
          data: {
            oddzial: activeOptions.data.oddzial,
            grupa_K: activeOptions.data.grupa_K,
            grupa_L: activeOptions.data.grupa_L,
            grupa_P: newValue,
          },
        });
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <SelectList
          data={oddzialList}
          value={activeOptions.data.oddzial}
          label={'oddzial'}
          setValue={onDataChange}
        />
      </View>
      <View style={styles.option}>
        <SelectList
          data={filterOptionList.grupa_L_list}
          setValue={onDataChange}
          value={activeOptions.data.grupa_L}
          label={'grupa_L'}
        />
      </View>
      <View style={styles.option}>
        <SelectList
          data={filterOptionList.grupa_K_list}
          setValue={onDataChange}
          value={activeOptions.data.grupa_K}
          label={'grupa_K'}
        />
      </View>
      <View style={styles.option}>
        <SelectList
          data={filterOptionList.grupa_P_list}
          setValue={onDataChange}
          value={activeOptions.data.grupa_P}
          label={'grupa_P'}
        />
      </View>
      <TouchableOpacity
        style={styles.bottomBar}
        onPress={() => closeModal(activeOptions)}>
        <View style={styles.modal_close}>
          <Text style={styles.modal_close_text}>Close</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '60%',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  optionSelectList: {
    backgroundColor: '#333',
    width: '70%',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  modal_close: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  modal_close_text: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
  },
  bottomBar: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});

export default Settings;
