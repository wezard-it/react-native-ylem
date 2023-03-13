import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const Style = StyleSheet.create({
  container: {},
  shadowLight: {
    ...theme.shadows.light,
    backgroundColor: theme.colors.white,
  },
  shadowMedium: {
    ...theme.shadows.medium,
    backgroundColor: theme.colors.white,
  },
  shadowDark: {
    ...theme.shadows.dark,
    backgroundColor: theme.colors.white,
  },
});

export default Style;
