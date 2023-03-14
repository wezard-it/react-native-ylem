import Accordion from 'src/components/Accordion/Accordion';
import ActionSheet from 'src/components/ActionSheet/ActionSheet';
import BottomSheet from 'src/components/BottomSheet/BottomSheet';
import Button from 'src/components/Button/Button';
import Card from 'src/components/Card/Card';
import Checkbox from 'src/components/Checkbox/Checkbox';
import Icon from 'src/components/Icon/Icon';
import Separator from 'src/components/Separator/Separator';
import Spinner from 'src/components/Spinner/Spinner';
import Text from 'src/components/Text/Text';
import Toggle from 'src/components/Toggle/Toggle';
import type {
  AccordionProps,
  ActionsheetHandler,
  ActionSheetProps,
  BottomSheetHandler,
  BottomSheetProps,
  ButtonProps,
  CardProps,
  CheckboxProps,
  Colors,
  CustomButtonProps,
  FontWeight,
  IconProps,
  Radius,
  SeparatorProps,
  Shadow,
  Spacing,
  SpinnerProps,
  TextProps,
  TextType,
  Theme,
  ToggleProps,
  Typography,
  TypographyType,
} from 'src/global';
import { theme } from 'src/theme';

declare module '@wezard/react-native-ylem' {
  export {
    theme,
    Colors,
    Radius,
    Shadow,
    Spacing,
    TypographyType,
    Typography,
    Theme,
  };
  export { Accordion, AccordionProps };
  export { ActionSheet, ActionsheetHandler, ActionSheetProps };
  export { BottomSheet, BottomSheetHandler, BottomSheetProps };
  export { Button, ButtonProps, CustomButtonProps };
  export { Card, CardProps };
  export { Checkbox, CheckboxProps };
  export { Icon, IconProps };
  export { Separator, SeparatorProps };
  export { Spinner, SpinnerProps };
  export { Text, TextType, TextProps, FontWeight };
  export { Toggle, ToggleProps };
}
