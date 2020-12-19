import React from 'react';
import constants from "./constants";

const GlobalContext = React.createContext({
    mapCenter: [],
    setMapCenter: () => {
    },
});

const GlobalContextProvider = ({children}) => {
    const [mapCenter, setMapCenter] = React.useState(constants.DEFAULT_MAP_CENTER);

    return (
        <GlobalContext.Provider value={{
            mapCenter, setMapCenter,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export {GlobalContext, GlobalContextProvider};