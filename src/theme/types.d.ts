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

type Spacing = {
  xs: number;
  s: number;
  midS: number;
  m: number;
  midM: number;
  l: number;
  midL: number;
  xl: number;
};

type TypographyType = {
  fontFamily: string;
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
