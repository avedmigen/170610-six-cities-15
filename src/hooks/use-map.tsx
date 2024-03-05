import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { TLocation } from '../types/offer';
import { MAP_LAYER, MAP_LAYER_ATTRIBUTION } from '../const';

export default function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: TLocation
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(MAP_LAYER, {
        attribution: MAP_LAYER_ATTRIBUTION,
      });

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}
