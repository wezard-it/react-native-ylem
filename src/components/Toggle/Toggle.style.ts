import { StyleSheet, Platform } from 'react-native';

const Style = StyleSheet.create({
  switch: {
    transform: [{ scale: Platform.OS === 'ios' ? 0.9 : 1.1 }],
  },
});

export default Style;
