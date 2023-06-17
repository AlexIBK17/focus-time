import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, paddingSizes } from '../../utils/Sizes';

const minToMillis = (min) => {
  return min * 1000 * 60;
};
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({mins = 1, isPaused, onProgress, onEnd}) => {
  const interval = useRef(null);
  const [millis, setMillis] = useState(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
       clearInterval(interval.current);
      onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft/minToMillis(mins))
      return timeLeft;
    });
  };

  useEffect (() => {
    setMillis(minToMillis(mins))
  }, [mins])

  useEffect(() => {
    if (isPaused) {
      if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minutes = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minutes)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxxl,
    color: '#ffff',
    padding: paddingSizes.md,
    backgroundColor: 'rgba(94,132,226,0.6)',
  },
});
