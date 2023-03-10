import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const Style = StyleSheet.create({
  button: {
    borderRadius: theme.radius.s,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonSm: { height: 30 },
  buttonMd: { height: 40 },
  buttonLg: { height: 50 },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: { backgroundColor: theme.colors.neutralLight },
  outlined: { backgroundColor: theme.colors.white, borderWidth: 1 },
  disabledOutlined: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.neutralBorder,
  },
  titleContainer: { alignSelf: 'flex-start', paddingHorizontal: 16 },
  titleContainerIcon: { alignSelf: 'flex-start', paddingHorizontal: 5 },
  title: { color: theme.colors.white },
  titleSm: { ...theme.typography.titleSm },
  titleMd: { ...theme.typography.titleMd },
  titleLg: { ...theme.typography.titleLg },
  titleDisabled: { color: theme.colors.neutralTextDisabled },
  iconContainer: {},
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
