import Mapbox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';

import LineRoute from './LineRoute';
import ScooterMarkers from './ScooterMarkers';

import { useRide } from '~/providers/RideProvider';
import { useScooter } from '~/providers/ScooterProvider';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

export default function Map() {
  const { directionCoordinates } = useScooter();
  const { ride, rideRoute } = useRide();

  const showMarkers = !ride;

  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followZoomLevel={14} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

      {rideRoute.length > 0 && <LineRoute id="rideRoute" coordinates={rideRoute} />}

      {showMarkers && (
        <>
          <ScooterMarkers />
          {directionCoordinates && <LineRoute coordinates={directionCoordinates} />}
        </>
      )}
    </MapView>
  );
}
