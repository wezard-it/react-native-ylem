import type { Props as AccordionProps } from './components/Accordion/Accordion';
import type { Props as ActionSheetProps } from './components/ActionSheet/ActionSheet';
import type { Props as CheckboxProps } from './components/Checbox/Checbox';
import type { Props as IconProps } from './components/Icon/Icon';
import type { Props as SeparatorProps } from './components/Separator/Separator';
import type { Props as SpinnerProps } from './components/Spinner/Spinner';
import type { Props as TextProps } from './components/Text/Text';
import type { Props as ToggleProps } from './components/Toggle/Toggle';

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

interface BottomSheetProps {
  title: string | null;
  children: React.ReactNode;
  hasHeader: boolean;
  header: React.ReactNode;
  points: string[];
  overlayOpacity: number;
  onCloseBottomSheet?: () => void;
}
type ActionsheetHandler = { show: () => void };

type CheckboxProps = CheckboxProps;
type IconProps = IconProps;
type SeparatorProps = SeparatorProps;
type TextProps = TextProps;
type ToggleProps = ToggleProps;
type SpinnerProps = SpinnerProps;
type AccordionProps = AccordionProps;
type ActionSheetProps = ActionSheetProps;
