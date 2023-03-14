import React from 'react';
import { ActivityIndicator } from 'react-native';
import type { SpinnerProps as Props } from '../../global';
import { theme } from '../../theme';

const Spinner = ({
  size = 'small',
  color = theme.colors.white,
}: Partial<Props>): JSX.Element => {
  return <ActivityIndicator color={color} size={size} />;
};

export default Spinner;
