import React from 'react';
import { ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

export interface Props {
  size: number | 'small' | 'large' | undefined;
  color: string;
}

const Spinner = ({
  size = 'small',
  color = theme.colors.white,
}: Partial<Props>): JSX.Element => {
  return <ActivityIndicator color={color} size={size} />;
};

export default Spinner;
