import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { RoundedButton } from '../../component/RoundedButton';
import { fontSizes, paddingSizes } from '../../../utils/Sizes';
import { Countdown } from '../../component/Countdown';
import { Timing } from './Timing';

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const DefaultTime = 0.1;
  const [minuties, setMinuties] = useState(DefaultTime);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const onProgress = (progress) => setProgress(progress);

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinuties(DefaultTime);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinuties(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <Countdown
          mins={minuties}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd = {onEnd}
        />
      </View>
      <View>
        <Text style={styles.title}>We are foucsing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <ProgressBar
        progress={progress}
        color="#5E84E2"
        style={{ height: 10, marginTop: 20 }}
      />
      <View style={styles.countB}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.countB}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSub} >
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#ffff',
    fontSize: fontSizes.md,
    textAlign: 'center',
    marginTop: paddingSizes.sm,
  },

  task: {
    color: '#ffff',
    fontSize: fontSizes.md,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  countB: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    justifyContent: 'center',
  },

  clearSub:{
    paddingBottom: 25,
    paddingLeft: 25
  }
});
