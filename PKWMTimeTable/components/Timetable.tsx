/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StoreDataType} from '../storage';
import {filterOptionList} from './Settings';

export enum WeekType {
  Odd = 'N',
  Even = 'P',
}

export enum Day {
  Monday = 'Poniedziałek',
  Tuesday = 'Wtorek',
  Wednesday = 'Środa',
  Thursday = 'Czwartek',
  Friday = 'Piątek',
}

type DayBarProps = {
  day: Day;
  setDay: (newDay: Day, newWeek: WeekType) => void;
  weekType: WeekType;
};

const DayBar = ({day, setDay, weekType}: DayBarProps) => {
  const previousDay = () => {
    let newWeekType: WeekType = weekType;
    let index = Object.values(Day).indexOf(day);

    if (index - 1 < 0) {
      index = Object.keys(Day).indexOf(Day.Friday) + 1;
      newWeekType =
        Object.values(WeekType).at(
          (Object.values(WeekType).indexOf(weekType) + 1) % 2,
        ) || WeekType.Even;
    }

    setDay(Object.values(Day).at(index - 1) || Day.Monday, newWeekType);
  };

  const nextDay = () => {
    let newWeekType: WeekType = weekType;
    let index = Object.values(Day).indexOf(day);

    if (index + 1 >= Object.keys(Day).length) {
      index = Object.keys(Day).indexOf(Day.Monday);
      newWeekType =
        Object.values(WeekType).at(
          (Object.values(WeekType).indexOf(weekType) + 1) % 2,
        ) || WeekType.Even;
    }

    setDay(Object.values(Day).at(index + 1) || Day.Monday, newWeekType);
  };

  return (
    <View style={style.dayBar}>
      <TouchableOpacity
        style={style.dayBar_button}
        onPress={() => previousDay()}>
        <Text style={[style.dayBar_text, {fontSize: 30}]}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={style.dayBar_text}>
        {day} ({weekType})
      </Text>

      <TouchableOpacity style={style.dayBar_button} onPress={() => nextDay()}>
        <Text style={[style.dayBar_text, , {fontSize: 30}]}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

type SubjectsList = {
  hours: [];
  data: [] | [][] | undefined | [{}][];
  loadData: () => void;
};
const SubjectsList = ({hours, data, loadData}: SubjectsList) => {
  const [refreshing, setRefreshing] = React.useState(false);

  //TODO refresh disable on data load
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, [loadData]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        {data?.map((element, index) => {
          return (
            <View style={style.subject} key={index}>
              <View style={style.subject_hour}>
                <Text style={style.text}>{hours[index]}</Text>
              </View>

              <View style={style.subject_name}>
                {element?.map((e: any, i) => {
                  return (
                    e.name && (
                      <Text key={i} style={style.text}>
                        {e?.name} {e?.classroom}
                      </Text>
                    )
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

type TimetableType = {
  day: Day;
  setDay: (newDay: Day, newWeek: WeekType) => void;
  weekType: WeekType;
  hours: [];
  subjects: [];
  loadData: () => void;
  filterOptions: StoreDataType;
};

export const Timetable = ({
  day,
  setDay,
  weekType,
  hours,
  subjects,
  loadData,
  filterOptions,
}: TimetableType) => {
  const checkFilters = (name: string): boolean => {
    let correct: boolean = true;

    filterOptionList.grupa_K_list.forEach(e => {
      if (e !== filterOptions.data.grupa_K && name.indexOf(e) !== -1)
        correct = false;
    });

    filterOptionList.grupa_L_list.forEach(e => {
      if (e !== filterOptions.data.grupa_L && name.indexOf(e) !== -1)
        correct = false;
    });

    filterOptionList.grupa_P_list.forEach(e => {
      if (e !== filterOptions.data.grupa_P && name.indexOf(e) !== -1)
        correct = false;
    });

    return correct;
  };

  const isElementOdd = (element: any, i: number): boolean => {
    if (
      element[i].name.indexOf('(P)') === -1 &&
      element[i].name.indexOf('-(p') === -1 &&
      checkFilters(element[i].name)
    )
      return true;
    return false;
  };

  const isElementEven = (element: any, i: number): boolean => {
    if (
      element[i].name.indexOf('(N)') === -1 &&
      element[i].name.indexOf('-(n') === -1 &&
      checkFilters(element[i].name)
    )
      return true;
    return false;
  };

  const data: [][] | [{}][] | undefined = subjects
    .map((element: any) => element[Object.values(Day).indexOf(day)])
    .map((element: any) => {
      const temp: [] | any = [];
      if (weekType === WeekType.Odd) {
        for (let i = 0; i < element?.length || 0; i++)
          if (isElementOdd(element, i)) temp.push(element[i]);
      } else {
        for (let i = 0; i < element?.length || 0; i++)
          if (isElementEven(element, i)) temp.push(element[i]);
      }
      return temp;
    });

  return (
    <>
      <DayBar day={day} setDay={setDay} weekType={weekType} />
      <SubjectsList hours={hours} data={data} loadData={loadData} />
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
    backgroundColor: '#111',
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
    fontSize: 16,
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
    width: '30%',
  },
  subject_name: {
    width: '70%',
  },
});
