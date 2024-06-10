import type {
  ImageStyle,
  StyleProp,
  ViewStyle,
  TextProps as RNTextProps,
  TextStyle,
  LayoutChangeEvent,
} from 'react-native';
import type { WithSpringConfig } from 'react-native-reanimated';
import type {
  BottomSheetHandleProps,
  BottomSheetProps as GorhomBottomSheetProps,
} from '@gorhom/bottom-sheet';
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

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

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

interface BottomSheetHandler {
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  snapToIndex: (index: number) => void;
}

type Interpolation<T> = [T, T];

type CustomButtonProps = {
  background?: string;
  soft?: string;
  border?: string;
  disabled?: string;
  shadow?: StyleProp<ViewStyle>;
  interpolation?: {
    container?: Interpolation<string>;
    outlined?: Interpolation<string>;
    soft?: Interpolation<string>;
    text?: Interpolation<string>;
    disabled?: Interpolation<string>;
  };
  interpolationColor?: {
    container?: Interpolation<string>;
    outlined?: Interpolation<string>;
    soft?: Interpolation<string>;
    text?: Interpolation<string>;
    disabled?: Interpolation<string>;
  };
  spinner?: {
    active: string;
    disabled: string;
  };
  title?: {
    container?: string;
    outlined?: string;
    soft?: string;
    text?: string;
    disabled?: string;
  };
};

interface BottomConfig {
  damping: number;
  overshootClamping: boolean;
  restDisplacementThreshold: number;
  restSpeedThreshold: number;
  stiffness: number;
}
// #endregion

// #region Theme
interface Colors {
  primaryDark: string;
  primary: string;
  primary1: string;
  secondaryDark: string;
  secondary: string;
  secondary1: string;
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
  fontWeight: FontWeight;
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
  titleColor: string;
  description: string;
  icon: boolean;
  iconType: 'default' | 'custom';
  iconColor: string;
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
  type: 'dynamic' | 'fixed';
  config: Omit<WithSpringConfig, 'velocity'>;
  duration: number;
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  points: string[];
  overlayOpacity: number;
  backdropType: 'default' | 'custom' | 'none';
  backdrop: React.ReactNode;
  backgroundStyle: StyleProp<
    Omit<ViewStyle, 'bottom' | 'left' | 'position' | 'right' | 'top'>
  >;
  keyboardBehavior: 'fillParent' | 'interactive' | 'extend' | undefined;
  keyboardBlurBehavior: 'none' | 'restore' | undefined;
  handleComponent: React.FC<BottomSheetHandleProps>;
  props: Partial<GorhomBottomSheetProps>;
  onIndexChanged?: (index: number) => void;
  onCloseBottomSheet?: () => void;
}

interface ButtonProps {
  type: 'primary' | 'secondary' | 'custom';
  variant: 'container' | 'outlined' | 'soft' | 'text';
  size: 'sm' | 'md' | 'lg' | 'custom';
  width: string;
  height: number;
  title: string | DefaultTFuncReturn;
  titleStyle: StyleProp<TextStyle>;
  icon: string;
  iconType: 'default' | 'custom';
  iconSize: number;
  hasIcon: boolean;
  iconPosition: 'left' | 'right';
  iconColor: string;
  isLoading: boolean;
  spinnerColor: string;
  isDisabled: boolean;
  disabledColor: string;
  hasShadow: boolean;
  shadowType: 'light' | 'medium' | 'dark' | 'custom';
  shadowStyle: StyleProp<ViewStyle>;
  animation: 'bounce' | 'interpolation' | 'none';
  bounciness: number;
  interpolationSet: Interpolation<string>;
  containerStyle: StyleProp<ViewStyle>;
  style: StyleProp<ViewStyle>;
  fillSpace: boolean;
  custom: CustomButtonProps;
  children: React.ReactNode;
  onPress: () => void;
}

interface CardProps {
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
  isDisabled: boolean;
  disabledColor: string;
  backgroundColor: string;
  radius: number;
  animation: 'bounce' | 'none';
  bounciness: number;
  shadow: 'light' | 'medium' | 'dark' | 'none';
  shadowStyle: StyleProp<ViewStyle>;
  onPress: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
}

interface CheckboxProps {
  active: boolean;
  activeColor: string;
  defaultColor: string;
  defaultColorDark: string;
  disabledColor: string;
  icon: string;
  iconType: 'default' | 'custom';
  iconSize: number;
  isDisabled: boolean;
  size: number;
  type: 'round' | 'square';
  onPress?: () => void;
  containerStyle: StyleProp<ViewStyle>;
}

interface IconProps {
  name: IconName;
  style: ImageStyle;
  containerStyle: ImageStyle;
  size: number;
  tint: string | null;
  pointerEvents: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
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

interface TextProps extends RNTextProps {
  type: TextType;
  color?: string;
  style?: StyleProp<TextStyle>;
  underlined?: boolean;
  textDecoration?: TextDecorationLine | null;
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

interface SliderProps extends ViewProps {
  min: number;
  max: number;
  currentMin?: number;
  currentMax?: number;
  minRange?: number;
  step: number;
  renderThumb: (name: 'high' | 'low') => React.ReactNode;
  low?: number;
  high?: number;
  allowLabelOverflow?: boolean;
  disableRange?: boolean;
  disabled?: boolean;
  floatingLabel?: boolean;
  renderLabel?: (value: number) => React.ReactNode;
  renderNotch?: (value: number) => React.ReactNode;
  renderRail: () => React.ReactNode;
  renderRailSelected: () => React.ReactNode;
  onValueChanged?: (low: number, high: number, byUser: boolean) => void;
  onSliderTouchStart?: (low: number, high: number) => void;
  onSliderTouchEnd?: (low: number, high: number) => void;
}
