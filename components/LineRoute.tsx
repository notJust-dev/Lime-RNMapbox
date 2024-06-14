import { LineLayer, ShapeSource } from '@rnmapbox/maps';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';

export default function LineRoute({ coordinates }: { coordinates: Position[] }) {
  return (
    <ShapeSource
      id="routeSource"
      lineMetrics
      shape={{
        properties: {},
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates,
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
  );
}
