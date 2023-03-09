import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const Style = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSquare: { borderRadius: theme.radius.s },
  containerRound: { borderRadius: theme.radius.infinite },
});

export default Style;
