import React, { useMemo } from 'react';
import { Switch, Platform } from 'react-native';
import { noop } from 'lodash';
import type { ToggleProps as Props } from 'src/global';
import { theme } from '../../theme';
import Style from './Toggle.style';

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
