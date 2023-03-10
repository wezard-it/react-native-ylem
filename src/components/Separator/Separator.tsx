import React, { useMemo } from 'react';
import { View } from 'react-native';
import type { SeparatorProps as Props } from 'src/global';
import { theme } from '../../theme';
import Style from './Separator.style';

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
