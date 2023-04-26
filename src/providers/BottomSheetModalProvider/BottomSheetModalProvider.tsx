import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheetModalProvider as GorhomBottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Props {
  children: React.ReactNode;
}

const BottomSheetModalProvider = ({ children }: Props) => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <GorhomBottomSheetModalProvider>
        {children}
      </GorhomBottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default BottomSheetModalProvider;
