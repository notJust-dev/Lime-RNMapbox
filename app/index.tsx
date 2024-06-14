import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Stack, Link } from 'expo-router';
import { Text } from 'react-native';

import Map from '~/components/Map';
import SelectedScooterSheet from '~/components/SelectedScooterSheet';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Map />
      <SelectedScooterSheet />
    </>
  );
}
