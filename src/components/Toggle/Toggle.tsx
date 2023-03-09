import React, { useMemo } from 'react';
import { Switch, Platform, StyleProp, ViewStyle } from 'react-native';
import { noop } from 'lodash';
import { theme } from '../../theme';
import Style from './Toggle.style';

export interface Props {
  active: boolean;
  isDisabled: boolean;
  style?: StyleProp<ViewStyle>;
  thumbColor: string;
  trackActive: string;
  trackDefault: string;
  onPress?: () => void;
}

const Toggle = ({
  active = false,
  isDisabled = false,
  thumbColor = theme.colors.white,
  trackActive = theme.colors.primary,
  trackDefault = theme.colors.neutralTextDisabled,
  style = null,
  onPress = noop,
}: Partial<Props>): JSX.Element => {
  const _style = useMemo(() => {
    return [Style.switch, style];
  }, [style]);

  const trueTrack = useMemo(() => {
    const isAndroidDevice = Platform.OS === 'android';
    return isAndroidDevice && isDisabled ? trackDefault : trackActive;
  }, [isDisabled, trackActive, trackDefault]);

  return (
    <Switch
      value={active}
      trackColor={{ false: trackDefault, true: trueTrack }}
      thumbColor={thumbColor}
      disabled={isDisabled}
      style={_style}
      onChange={onPress}
    />
  );
};

export default Toggle;
