import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const Style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingBottom: 10,
  },
  handle: { height: 40 },
  background: { borderRadius: 40 },
});

export default Style;
