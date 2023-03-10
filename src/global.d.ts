import type {
  ImageStyle,
  StyleProp,
  ViewStyle,
  TextProps,
  TextStyle,
} from 'react-native';
import type { DefaultTFuncReturn } from 'i18next';

// #region Accessories
type ActionsheetHandler = { show: () => void };

type IconMap = { [key: string]: string };

type IconName = keyof IconMap;

type OptionsAndroid = {
  text: string;
  style?: 'default' | 'destructive' | 'cancel';
};

type FormattedOptions = OptionsAndroid & { onPress: () => void };

type TextType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'title-sm'
  | 'title-md'
  | 'title-lg'
  | 'title-bold'
  | 'p-sm'
  | 'p-md'
  | 'p-lg'
  | 'link-sm'
  | 'link-md'
  | 'link-lg';

type TextDecorationLine =
  | 'none'
  | 'underline'
  | 'line-through'
  | 'underline line-through'
  | undefined;

interface IBottomSheetHandler {
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
}
// #endregion

// #region Theme
interface Colors {
  primary: string;
  primary1: string;
  accent: string;
  accent1: string;
  text: string;
  text1: string;
  gray: string;
  gray1: string;
  gray2: string;
  gray3: string;
  neutral: string;
  neutralLight: string;
  neutralBorder: string;
  neutralDark: string;
  neutralTextDisabled: string;
  white: string;
  black: string;
}

interface Radius {
  xs?: number;
  s?: number;
  m?: number;
  l?: number;
  xl?: number;
  xxl?: number;
  infinite?: number;
}

interface Shadow {
  [key: string]: {
    shadowColor: string;
    shadowOffset: {
      width: number;
      height: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

interface Spacing {
  xs: number;
  s: number;
  midS: number;
  m: number;
  midM: number;
  l: number;
  midL: number;
  xl: number;
}

type TypographyType = {
  fontFamily?: string;
  fontSize: number;
  fontWeight: FontWeightType;
  color: string;
  lineHeight: number;
};

interface Typography {
  themeFont?: { fontFamily?: string };
  h1?: TypographyType;
  h2?: TypographyType;
  h3?: TypographyType;
  h4?: TypographyType;
  titleSm?: TypographyType;
  titleMd?: TypographyType;
  titleLg?: TypographyType;
  titleBold?: TypographyType;
  pSm?: TypographyType;
  pMd?: TypographyType;
  pLg?: TypographyType;
  linkSm?: TypographyType;
  linkMd?: TypographyType;
  linkLg?: TypographyType;
}

interface Theme {
  colors: Colors;
  radius: Radius;
  shadows: Shadow;
  spacing: Spacing;
  typography: Typography;
}
// #endregion

// #region Components props
interface AccordionProps {
  title: string | DefaultTFuncReturn;
  description: string;
  icon: boolean;
  iconType: 'default' | 'custom';
  iconSize: number;
  backgroundAnimation: boolean;
  defaultColor: string;
  animatedColor: string;
}

interface ActionSheetProps {
  optionsIOS: string[];
  messageIOS: string | undefined;
  optionsAndroid: OptionsAndroid[];
  androidTitle: string | DefaultTFuncReturn;
  androidSubTitle: string | DefaultTFuncReturn;
  onActionPressed: (id: number | string) => void;
}

interface BottomSheetProps {
  title: string | null;
  children: React.ReactNode;
  hasHeader: boolean;
  header: React.ReactNode;
  points: string[];
  overlayOpacity: number;
  onCloseBottomSheet?: () => void;
}

interface CheckboxProps {
  active: boolean;
  activeColor: string;
  defaultColor: string;
  defaultColorDark: string;
  disabledColor: string;
  icon: string;
  iconSize: number;
  iconType: 'default' | 'custom';
  isDisabled: boolean;
  onPress?: () => void;
  size: number;
  type: 'round' | 'square';
}

interface IconProps {
  name: IconName;
  style: ImageStyle;
  containerStyle: ImageStyle;
  size: number;
  tint: string | null;
  onPress?: () => void;
}

interface SeparatorProps {
  size: number;
  backgroundColor: string;
  direction: 'horizontal' | 'vertical';
  containerStyle: StyleProp<ViewStyle>;
}

interface SpinnerProps {
  size: number | 'small' | 'large' | undefined;
  color: string;
}

interface CustomTextProps extends TextProps {
  type: TextType;
  color?: string;
  style?: StyleProp<TextStyle>;
  underlined?: boolean;
  rest?: string[];
  extendedStyle?: StyleProp<TextStyle>;
  fontFamily?: string | undefined;
}

interface ToggleProps {
  active: boolean;
  isDisabled: boolean;
  style?: StyleProp<ViewStyle>;
  thumbColor: string;
  trackActive: string;
  trackDefault: string;
  onPress?: () => void;
}
// #endregion
