import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { theme } from '../../theme';
import Style from './Separator.style';

export interface Props {
  size: number;
  backgroundColor: string;
  direction: 'horizontal' | 'vertical';
  containerStyle: StyleProp<ViewStyle>;
}

const Separator = ({
  size = 1,
  backgroundColor = theme.colors.gray2,
  direction = 'horizontal',
  containerStyle = null,
}: Partial<Props>): JSX.Element => {
  const separator = useMemo(() => {
    switch (direction) {
      case 'horizontal':
        return { height: size };
      case 'vertical':
        return { width: size };
      default:
        return { height: size };
    }
  }, [direction, size]);

  return (
    <View style={[containerStyle, { backgroundColor }]}>
      <View style={[Style.container, separator, { backgroundColor }]} />
    </View>
  );
};

export default Separator;
