import React, { useMemo } from 'react';
import {
  Image,
  ImageStyle,
  Platform,
  Pressable,
  ViewStyle,
} from 'react-native';
import VectorDrawable from '@klarna/react-native-vector-drawable';
import { noop, snakeCase } from 'lodash';

type IconMap = { [key: string]: string };

export type IconName = keyof IconMap;

export interface Props {
  name: IconName;
  style: ImageStyle;
  containerStyle: ImageStyle;
  size: number;
  tint: string | null;
  onPress?: () => void;
}

const Icon = ({
  name = 'sun',
  style = {},
  size = 24,
  tint = null,
  containerStyle = {},
  onPress = noop,
}: Partial<Props>) => {
  const _name = useMemo(() => {
    const base = 'ic_';
    return base.concat(snakeCase(name as string));
  }, [name]);

  let iconStyle: { width: number; height: number; tintColor?: string } = {
    width: size,
    height: size,
  };
  if (typeof tint === 'string') {
    iconStyle = { width: size, height: size, tintColor: tint };
  }

  return onPress !== undefined ? (
    <Pressable style={containerStyle} onPress={onPress}>
      {Platform.select({
        ios: <Image source={{ uri: _name }} style={[iconStyle, style]} />,
        android: (
          <VectorDrawable
            resourceName={_name!}
            style={[iconStyle, style as ViewStyle]}
          />
        ),
      }) || null}
    </Pressable>
  ) : (
    Platform.select({
      ios: <Image source={{ uri: _name }} style={[iconStyle, style]} />,
      android: (
        <VectorDrawable
          resourceName={_name!}
          style={[iconStyle, style as ViewStyle]}
        />
      ),
    }) || null
  );
};

export default Icon;
