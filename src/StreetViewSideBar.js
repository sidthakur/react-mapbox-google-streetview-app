import React from 'react';
import ReactStreetView from './ReactStreetView';

import {GlobalContext} from './GlobalContext';
import credentials from './credentials';

const streetViewSideBar = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    height: '27vw',
    width: '48vw',
    zIndex: 3
}

function StreetViewSideBar() {
    const [visible, setVisible] = React.useState(false);
    const {selectedPoint, setPanoPoint} = React.useContext(GlobalContext);
    React.useEffect(() => {
        if (selectedPoint.isNew) {
            setVisible(true);
        }
    }, [selectedPoint]);

    if (!visible) {
        return (<div/>);
    }
    const position = {lng: selectedPoint.coordinate[0], lat: selectedPoint.coordinate[1]};
    const streetViewPanoramaOptions = {
        position: position,
        pov: {heading: 0, pitch: 0},
        zoom: 1,
    }
    const onPanoChanged = (position) => {
        const coordinate = [position.lng(), position.lat()];
        setPanoPoint(coordinate);
    }
    return (
        <div style={streetViewSideBar}>
            <ReactStreetView apiKey={credentials.GOOGLE_MAPS_API_KEY}
                             position={position}
                             streetViewPanoramaOptions={streetViewPanoramaOptions}
                             onPanoChanged={onPanoChanged}
            />
        </div>
    );
}

export default StreetViewSideBar;