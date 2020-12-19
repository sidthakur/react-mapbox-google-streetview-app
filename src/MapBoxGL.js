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

function MapBoxGL() {
    const [map, setMap] = React.useState(null);
    const {mapCenter} = React.useContext(GlobalContext);
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
            });
        };
        const flyMapToNewMapCenter = ({mapCenter, map}) => {
            map.flyTo({center: mapCenter, zoom: 15});
        };
        if (!map) initializeMap({setMap, mapContainer});
        if (map) flyMapToNewMapCenter({mapCenter, map});
    }, [mapCenter, map]);

    return (
        <div ref={el => (mapContainer.current = el)} style={mapBoxGLStyle}>
        </div>
    );
}

export default MapBoxGL;
