import type {
  Colors,
  Radius,
  Shadow,
  Spacing,
  Theme,
  Typography,
} from 'src/types';

const colors: Colors = {
  primaryDark: '#1565c0',
  primary: '#1976d2',
  primary1: '#42a5f5',
  secondaryDark: '#7b1fa2',
  secondary: '#9c27b0',
  secondary1: '#ba68c8',
  text: '#70808C',
  text1: '#A9B3BA',
  gray: '#DDDDDD',
  gray1: '#EBEBEB',
  gray2: '#F4F4F4',
  gray3: '#FCFCFC',
  neutral: '#E3E7EB',
  neutralLight: '#EEF1F4',
  neutralBorder: '#F3F5F9',
  neutralDark: '#C7CED4',
  neutralTextDisabled: '#ABB8CA',
  white: '#FFFFFF',
  black: '#000000',
};

const radius: Radius = {
  xs: 2,
  s: 4,
  m: 6,
  l: 8,
  xl: 10,
  xxl: 12,
  infinite: 999,
};

const spacing: Spacing = {
  xs: 5,
  s: 10,
  midS: 15,
  m: 20,
  midM: 25,
  l: 30,
  midL: 35,
  xl: 40,
};

const shadows: Shadow = {
  light: {
    shadowColor: colors.neutral,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  medium: {
    shadowColor: colors.neutralBorder,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 7,
  },
  dark: {
    shadowColor: colors.neutralDark,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 6,
    elevation: 8,
  },
};

const typography: Typography = {
  themeFont: {
    fontFamily: 'Menlo',
  },
  h1: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 39,
    color: colors.black,
  },
  h2: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 27,
    color: colors.black,
  },
  h3: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: colors.black,
  },
  h4: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: colors.black,
  },
  titleSm: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: colors.black,
  },
  titleMd: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: colors.black,
  },
  titleLg: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: colors.black,
  },
  titleBold: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    color: colors.black,
  },
  pLg: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: colors.black,
  },
  pMd: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: colors.black,
  },
  pSm: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 15,
    color: colors.black,
  },
  linkLg: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.black,
  },
  linkMd: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: colors.black,
  },
  linkSm: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: colors.black,
  },
};

export const theme: Theme = {
  colors,
  radius,
  shadows,
  spacing,
  typography,
};
