import { Stack, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import Map from '~/components/Map';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Map />
    </>
  );
}
