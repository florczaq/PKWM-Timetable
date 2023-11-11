/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const oddzial_list = ['11K1', '11K2', '11K3'];
const grupa_L_list = ['L01', 'L02', 'L03', 'L04', 'L05', 'L06'];
const grupa_K_list = ['K01', 'K02', 'K03', 'K04', 'K05'];

type SelectList = {
  data: string[];
  setValue: (value: string) => void;
  value: string;
};
const SelectList = ({data, setValue, value}: SelectList) => {
  return (
    <View style={styles.optionSelectList}>
      <Dropdown
        // mode="modal"
        data={data.map(e => {
          return {label: e, value: e};
        })}
        labelField={'label'}
        valueField={'value'}
        onChange={v => {
          setValue(v.value);
        }}
        containerStyle={{backgroundColor: '#333'}}
        itemTextStyle={{textAlign: 'center'}}
        activeColor="transparent"
        value={value}
        selectedTextStyle={{textAlign: 'center'}}
      />
    </View>
  );
};
const Settings = () => {
  const [oddzial, setOddzial] = useState(oddzial_list[0]);
  const [grupa_K, setGrupa_K] = useState(grupa_K_list[0]);
  const [grupa_L, setGrupa_L] = useState(grupa_L_list[0]);

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <SelectList
          data={oddzial_list}
          value={oddzial}
          setValue={s => setOddzial(s)}
        />
      </View>
      <View style={styles.option}>
        <SelectList
          data={grupa_L_list}
          setValue={s => setGrupa_L(s)}
          value={grupa_L}
        />
      </View>
      <View style={styles.option}>
        <SelectList
          data={grupa_K_list}
          setValue={s => setGrupa_K(s)}
          value={grupa_K}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  option: {
    width: '100%',
    height: 100,
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
});

export default Settings;
