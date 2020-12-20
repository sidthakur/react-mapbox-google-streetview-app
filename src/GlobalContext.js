import React from 'react';
import constants from "./constants";

const GlobalContext = React.createContext({
    mapCenter: [],
    setMapCenter: () => {
    },
    selectedPoint: {isNew: false, coordinate: []},
    setSelectedPoint: () => {
    },
    panoPoint: [],
    setPanoPoint: () => {
    }
});

const GlobalContextProvider = ({children}) => {
    const [mapCenter, setMapCenter] = React.useState(constants.DEFAULT_MAP_CENTER);
    const [selectedPoint, setSelectedPoint] = React.useState({isNew: false, coordinate: []});
    const [panoPoint, setPanoPoint] = React.useState([]);

    return (
        <GlobalContext.Provider value={{
            mapCenter, setMapCenter,
            selectedPoint, setSelectedPoint,
            panoPoint, setPanoPoint,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export {GlobalContext, GlobalContextProvider};