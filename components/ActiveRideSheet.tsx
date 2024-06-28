import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { Text } from 'react-native';

import { Button } from './Button';

import { useRide } from '~/providers/RideProvider';

export default function ActiveRideSheet() {
  const { ride, finishRide } = useRide();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (ride) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [ride]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[200]}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: '#414442' }}>
      {ride && (
        <BottomSheetView style={{ flex: 1, padding: 10, gap: 20 }}>
          <Text>Ride in progress</Text>

          <Button title="Finish journey" onPress={() => finishRide()} />
        </BottomSheetView>
      )}
    </BottomSheet>
  );
}
