import React, { forwardRef, useImperativeHandle } from 'react';
import { ActionSheetIOS, Alert, Platform } from 'react-native';
import type { DefaultTFuncReturn } from 'i18next';
import { noop } from 'lodash';
import type { ActionsheetHandler } from 'src/global';

type OptionsAndroid = {
  text: string;
  style?: 'default' | 'destructive' | 'cancel';
};
type FormattedOptions = OptionsAndroid & { onPress: () => void };

export interface Props {
  optionsIOS: string[];
  messageIOS: string | undefined;
  optionsAndroid: OptionsAndroid[];
  androidTitle: string | DefaultTFuncReturn;
  androidSubTitle: string | DefaultTFuncReturn;
  onActionPressed: (id: number | string) => void;
}

const ActionSheet = (
  {
    optionsIOS = [],
    messageIOS = undefined,
    optionsAndroid = [],
    androidTitle = 'Title',
    androidSubTitle = 'Subtitle',
    onActionPressed = noop,
  }: Partial<Props>,
  ref: React.Ref<ActionsheetHandler>
): JSX.Element | null => {
  useImperativeHandle(ref, () => ({
    show() {
      if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: [...optionsIOS],
            cancelButtonIndex: 0,
            userInterfaceStyle: 'light',
            message: messageIOS,
          },
          (selected: number) => {
            if (selected === 0) {
              console.log('cancelled');
            } else {
              onActionPressed(selected);
            }
          }
        );
      } else {
        const formattedOptions: FormattedOptions[] = [];
        optionsAndroid.map((option, index) => {
          formattedOptions.push({
            text: option?.text,
            onPress: () => onActionPressed(index),
            style: option?.style || 'default',
          });
          return null;
        });

        Alert.alert(
          androidTitle!.toString(),
          androidSubTitle!.toString(),
          [...formattedOptions],
          { cancelable: false }
        );
      }
    },
  }));

  return null;
};

export default forwardRef(ActionSheet);
