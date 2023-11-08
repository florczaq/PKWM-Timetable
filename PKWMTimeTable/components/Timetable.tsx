/* eslint-disable prettier/prettier */
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
  data: [] | [][] | undefined;
};
const SubjectsList = ({hours, data}: SubjectsList) => {
  return (
    <ScrollView>
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
                    <Text key={i} style={style.text}>
                      {e?.name} {e?.classroom}
                    </Text>
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

type TimetableProps = {
  day: Day;
  setDay: (newDay: Day, newWeek: WeekType) => void;
  weekType: WeekType;
  hours: [];
  subjects: [];
};

export const Timetable = ({
  day,
  setDay,
  weekType,
  hours,
  subjects,
}: TimetableProps) => {
  const data: [][] | undefined = subjects
    .map((element: any) => element[Object.values(Day).indexOf(day)])
    .map((element: any) => {
      const temp: [] = [];
      if (weekType === WeekType.Odd) {
        for (let i = 0; i < element?.length || 0; i++) {
          if (
            element[i].name.indexOf('(P)') === -1 &&
            element[i].name.indexOf('-(p') === -1
          ) {
            temp.push(element[i]);
          }
        }
      } else {
        for (let i = 0; i < element?.length || 0; i++) {
          if (
            element[i].name.indexOf('(N)') === -1 &&
            element[i].name.indexOf('-(n') === -1
          ) {
            temp.push(element[i]);
          }
        }
      }
      return temp;
    });

  return (
    <>
      <DayBar day={day} setDay={setDay} weekType={weekType} />
      <SubjectsList hours={hours} data={data} />
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
