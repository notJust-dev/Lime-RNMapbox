import Mapbox, {
  Camera,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
  Images,
  CircleLayer,
  LineLayer,
} from '@rnmapbox/maps';
import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import { featureCollection, point } from '@turf/helpers';
import * as Location from 'expo-location';
import { useState } from 'react';

import pin from '~/assets/pin.png';
import routeResponse from '~/data/route.json';
import scooters from '~/data/scooters.json';
import { getDirections } from '~/services/directions';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

export default function Map() {
  const [direction, setDirection] = useState();
  const points = scooters.map((scooter) => point([scooter.long, scooter.lat]));

  const directionCoordinate = direction?.routes?.[0]?.geometry.coordinates;

  const onPointPress = async (event: OnPressEvent) => {
    const myLocation = await Location.getCurrentPositionAsync();

    const newDirection = await getDirections(
      [myLocation.coords.longitude, myLocation.coords.latitude],
      [event.coordinates.longitude, event.coordinates.latitude]
    );
    setDirection(newDirection);
  };

  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followZoomLevel={14} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

      <ShapeSource id="scooters" cluster shape={featureCollection(points)} onPress={onPointPress}>
        <SymbolLayer
          id="clusters-count"
          style={{
            textField: ['get', 'point_count'],
            textSize: 18,
            textColor: '#ffffff',
            textPitchAlignment: 'map',
          }}
        />

        <CircleLayer
          id="clusters"
          belowLayerID="clusters-count"
          filter={['has', 'point_count']}
          style={{
            circlePitchAlignment: 'map',
            circleColor: '#42E100',
            circleRadius: 20,
            circleOpacity: 1,
            circleStrokeWidth: 2,
            circleStrokeColor: 'white',
          }}
        />

        <SymbolLayer
          id="scooter-icons"
          filter={['!', ['has', 'point_count']]}
          style={{
            iconImage: 'pin',
            iconSize: 0.5,
            iconAllowOverlap: true,
            iconAnchor: 'bottom',
          }}
        />
        <Images images={{ pin }} />
      </ShapeSource>

      {directionCoordinate && (
        <ShapeSource
          id="routeSource"
          lineMetrics
          shape={{
            properties: {},
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: directionCoordinate,
            },
          }}>
          <LineLayer
            id="exampleLineLayer"
            style={{
              lineColor: '#42E100',
              lineCap: 'round',
              lineJoin: 'round',
              lineWidth: 7,
            }}
          />
        </ShapeSource>
      )}
    </MapView>
  );
}
