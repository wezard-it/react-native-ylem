import React from 'react';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import type {
  BackdropPressBehavior,
  BottomSheetDefaultBackdropProps,
} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

interface Props {
  props: BottomSheetDefaultBackdropProps;
  backdropPressBehavior?: BackdropPressBehavior;
}

const BottomBackdrop = ({ props, backdropPressBehavior = 'close' }: Props) => {
  return (
    <BottomSheetBackdrop
      pressBehavior={backdropPressBehavior}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.4}
      {...props}
    />
  );
};

export default BottomBackdrop;
