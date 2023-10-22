import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Timetable} from './components/Timetable';

const PageTitleBar = () => {
  return (
    <View style={styles.pageTitleBar}>
      <Text style={styles.pageTitleBar_text}>Plan lekcji</Text>
    </View>
  );
};

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.darker,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <PageTitleBar />
      <Timetable />
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
