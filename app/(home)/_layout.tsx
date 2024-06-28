import { Redirect, Slot } from 'expo-router';

import { useAuth } from '~/providers/AuthProvider';

export default function HomeLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  return <Slot />;
}
