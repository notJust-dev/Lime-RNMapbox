import * as Location from 'expo-location';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import { getDirections } from '~/services/directions';

const ScooterContext = createContext({});

export default function ScooterProvider({ children }: PropsWithChildren) {
  const [selectedScooter, setSelectedScooter] = useState();
  const [direction, setDirection] = useState();

  useEffect(() => {
    const fetchDirections = async () => {
      const myLocation = await Location.getCurrentPositionAsync();

      const newDirection = await getDirections(
        [myLocation.coords.longitude, myLocation.coords.latitude],
        [selectedScooter.long, selectedScooter.lat]
      );
      setDirection(newDirection);
    };

    if (selectedScooter) {
      fetchDirections();
    }
  }, [selectedScooter]);

  return (
    <ScooterContext.Provider
      value={{
        selectedScooter,
        setSelectedScooter,
        direction,
        directionCoordinates: direction?.routes?.[0]?.geometry?.coordinates,
        routeTime: direction?.routes?.[0]?.duration,
        routeDistance: direction?.routes?.[0]?.distance,
      }}>
      {children}
    </ScooterContext.Provider>
  );
}

export const useScooter = () => useContext(ScooterContext);
