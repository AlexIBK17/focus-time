import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { fontSizes, paddingSizes } from '../../../utils/Sizes';
import { RoundedButton } from '../../component/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItems(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}> Things we have focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItems: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
  }),

  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: paddingSizes.md,
  },
});
