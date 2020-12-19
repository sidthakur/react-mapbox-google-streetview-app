import React from 'react';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import {GlobalContext} from "./GlobalContext";
import credentials from "./credentials";

const searchBarStyles = {
    position: "absolute",
    top: "10px",
    left: "10px",
    zIndex: 1,
};

function SearchBar() {
    const {setMapCenter} = React.useContext(GlobalContext);
    const onSuggestionSelect = (result, lat, lng, text) => {
        setMapCenter([lng, lat]);
    }
    return (
        <div style={searchBarStyles}>
            <MapboxAutocomplete publicKey={credentials.MAPBOX_ACCESS_TOKEN}
                                inputClass="form-control search"
                                onSuggestionSelect={onSuggestionSelect}
                                country="us"
                                resetSearch={false}/>
        </div>
    );
}

export default SearchBar;
