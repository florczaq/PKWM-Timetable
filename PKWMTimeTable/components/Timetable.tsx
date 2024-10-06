/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays */
import React, {useEffect, useState} from 'react';
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

type WeekBarProps = {
  weekType: WeekType;
  changeWeek: () => void;
};

const WeekBar = ({weekType, changeWeek}: WeekBarProps) => {
  return (
    <View style={[style.dayBar, {height: 50}]}>
      <TouchableOpacity
        style={style.dayBar_button}
        onPress={() => changeWeek()}>
        <Text style={[style.dayBar_text, {fontSize: 30}]}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={style.dayBar_text}>
        {weekType === WeekType.Odd ? 'Nieparzysty' : 'Parzysty'}
      </Text>

      <TouchableOpacity
        style={style.dayBar_button}
        onPress={() => changeWeek()}>
        <Text style={[style.dayBar_text, , {fontSize: 30}]}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

type SubjectsListType = {
  hours: [];
  data: [] | [][] | undefined | [{}][];
  loadData: () => void;
};
const SubjectsList = ({hours, data, loadData}: SubjectsListType) => {
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

type WeekSubjectsListType = {
  hours: [];
  data: [] | [][] | undefined | [{}][];
  loadData: () => void;
};
const WeekSubjectsList = ({hours, data, loadData}: WeekSubjectsListType) => {
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
      <View
        style={[
          {
            flexDirection: 'row',
            width: '100%',
          },
        ]}>
        <View style={[{width: '16.66666%'}]}>
          {data?.at(0)?.map((element, index) => {
            return (
              <View
                style={[
                  {
                    width: '100%',
                    height: 40,
                    borderColor: 'black',
                    borderWidth: 1,
                    justifyContent: 'center',
                  },
                ]}
                key={index}>
                <View style={[]}>
                  <Text style={style.text}>{hours[index]}</Text>
                </View>
              </View>
            );
          })}
        </View>
        {Object.values(Day).map((_, dayIndex) => {
          return (
            <View style={[{width: '16.66666%'}]} key={dayIndex}>
              {data?.at(dayIndex)?.map((subjectName: any, index) => {
                return (
                  <View
                    style={[
                      {
                        width: '100%',
                        height: 40,
                        borderColor: 'black',
                        borderWidth: 1,
                        justifyContent: 'center',
                      },
                    ]}
                    key={index}>
                    <View style={[]}>
                      <Text style={style.text}>{subjectName}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

type DisplayOnPortrairType = {
  day: Day;
  setDay: (newDay: Day, newWeek: WeekType) => void;
  weekType: WeekType;
  hours: [];
  data: [][] | [{}][] | undefined;
  loadData: () => void;
};
const DisplayOnPortrair = ({
  day,
  setDay,
  weekType,
  hours,
  data,
  loadData,
}: DisplayOnPortrairType) => {
  return (
    <>
      <DayBar day={day} setDay={setDay} weekType={weekType} />
      <SubjectsList hours={hours} data={data} loadData={loadData} />
    </>
  );
};

type DisplayOnLandscapeType = {
  weekType: WeekType;
  hours: [];
  getWeekData: () => [][] | [{}][] | undefined;
  loadData: () => void;
  changeWeek: () => void;
};
const DisplayOnLandscape = ({
  weekType,
  hours,
  getWeekData,
  loadData,
  changeWeek,
}: DisplayOnLandscapeType) => {
  const [data, setData] = useState<[][] | [{}][] | undefined>([]);

  useEffect(() => {
    setData(getWeekData());
  }, [getWeekData]);

  return (
    <>
      <WeekBar weekType={weekType} changeWeek={changeWeek} />
      <WeekSubjectsList hours={hours} data={data} loadData={loadData} />
    </>
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
  landscape: boolean;
  changeWeek: () => void;
};

export const Timetable = ({
  day,
  setDay,
  weekType,
  hours,
  subjects,
  loadData,
  filterOptions,
  landscape,
  changeWeek,
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
      element[i].name.indexOf('(P') === -1 &&
      element[i].name.indexOf('-(p') === -1 &&
      checkFilters(element[i].name)
    )
      return true;
    return false;
  };

  const isElementEven = (element: any, i: number): boolean => {
    if (
      element[i].name.indexOf('(N') === -1 &&
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

  const getWeekData = (): [][] | [{}][] | undefined => {
    let week: any[] = [];
    let dayIndex: number = 0;
    while (dayIndex < Object.values(Day).length) {
      week.push(
        subjects
          .map((element: any) => element[dayIndex])
          .map((element: any) => {
            let temp: string = '';
            if (weekType === WeekType.Odd) {
              for (let i = 0; i < element?.length || 0; i++)
                if (isElementOdd(element, i)) temp = element[i]?.name;
            } else {
              for (let i = 0; i < element?.length || 0; i++)
                if (isElementEven(element, i)) temp = element[i]?.name;
            }
            return temp;
          }),
      );
      dayIndex++;
    }
    return week;
  };

  return (
    <>
      {landscape ? (
        <DisplayOnLandscape
          weekType={weekType}
          hours={hours}
          getWeekData={getWeekData}
          loadData={loadData}
          changeWeek={changeWeek}
        />
      ) : (
        <DisplayOnPortrair
          day={day}
          setDay={setDay}
          weekType={weekType}
          hours={hours}
          data={data}
          loadData={loadData}
        />
      )}
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
