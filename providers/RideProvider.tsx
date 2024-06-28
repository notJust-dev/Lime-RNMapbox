import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useAuth } from './AuthProvider';

import { supabase } from '~/lib/supabase';

const RideContext = createContext({});

export default function RideProvider({ children }: PropsWithChildren) {
  const [ride, setRide] = useState();

  const { userId } = useAuth();

  useEffect(() => {
    const fetchActiveRide = async () => {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('user_id', userId)
        .is('finished_at', null)
        .limit(1)
        .single();

      if (data) {
        setRide(data);
      }
    };

    fetchActiveRide();
  }, []);

  const startRide = async (scooterId: number) => {
    if (ride) {
      Alert.alert('Cannot start a new ride while another one is in progress');
      return;
    }
    const { data, error } = await supabase
      .from('rides')
      .insert([
        {
          user_id: userId,
          scooter_id: scooterId,
        },
      ])
      .select();
    if (error) {
      Alert.alert('Failed to start the ride');
      console.log(error);
    } else {
      setRide(data[0]);
    }
  };

  const finishRide = async () => {
    if (!ride) {
      return;
    }

    const { error } = await supabase
      .from('rides')
      .update({ finished_at: new Date() })
      .eq('id', ride.id);

    if (error) {
      Alert.alert('Failed to finish the ride');
    } else {
      setRide(undefined);
    }
  };

  console.log('Current ride: ', ride);

  return (
    <RideContext.Provider value={{ startRide, finishRide, ride }}>{children}</RideContext.Provider>
  );
}

export const useRide = () => useContext(RideContext);
