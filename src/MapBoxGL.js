import React from 'react';
import mapboxgl from 'mapbox-gl';

import {GlobalContext} from "./GlobalContext";
import credentials from './credentials';
import constants from './constants';

mapboxgl.accessToken = credentials.MAPBOX_ACCESS_TOKEN;

const mapBoxGLStyle = {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    zIndex: 0,
}

const PANO_POINT_LAYER = {
    'id': 'panoPoint',
    'type': 'symbol',
    'source': 'panoPoint',
    'layout': {
        'icon-image': 'cinema-15',
    }
};

const geoJsonPoint = (coorindate) => {
    return {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': coorindate
        },
        'properties': {}
    }
};

function MapBoxGL() {
    const [map, setMap] = React.useState(null);
    const {mapCenter, selectedPoint, setSelectedPoint, panoPoint} = React.useContext(GlobalContext);
    const mapContainer = React.useRef(null);

    React.useEffect(() => {
        const initializeMap = ({setMap, mapContainer}) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: mapCenter,
                zoom: constants.DEFAULT_MAP_ZOOM
            });

            map.on("load", () => {
                setMap(map);
                map.addSource('panoPoint', {
                    'type': 'geojson',
                    'data': geoJsonPoint([0, 0])
                });
                map.addLayer(PANO_POINT_LAYER);
            });
        };
        const flyMapToNewMapCenter = ({mapCenter, map}) => {
            map.flyTo({center: mapCenter, zoom: 15});
        };
        if (!map) initializeMap({setMap, mapContainer});
        if (map) flyMapToNewMapCenter({mapCenter, map});
    }, [mapCenter, map]);

    React.useEffect(() => {
        if (map && panoPoint.length === 2) {
            map.getSource('panoPoint').setData(geoJsonPoint(panoPoint));
        }
    }, [panoPoint]);

    const updateSelectedPointOnDragEnd = (e) => {
        let lngLat = e.target.getLngLat();
        const coordinate = [lngLat.lng, lngLat.lat];
        setSelectedPoint({isNew: false, coordinate: coordinate});
    }

    React.useEffect(() => {
        if (map && selectedPoint.isNew) {
            const lngLat = {lng: selectedPoint.coordinate[0], lat: selectedPoint.coordinate[1]};
            const marker = new mapboxgl.Marker({
                draggable: true
            })
                .setLngLat(lngLat)
                .addTo(map);

            marker.on('dragend', updateSelectedPointOnDragEnd);
        }
    }, [selectedPoint]);

    const captureOnePointFromMapClick = (e) => {
        if (e.key === 's' && map) {
            map.once('click', (e) => {
                const coordinate = [e.lngLat.lng, e.lngLat.lat];
                setSelectedPoint({isNew: true, coordinate: coordinate});
            });
        }
    };

    return (
        <div ref={el => (mapContainer.current = el)}
             style={mapBoxGLStyle}
             onKeyPress={captureOnePointFromMapClick}>
        </div>
    );
}

export default MapBoxGL;
