/*
Taken from: https://github.com/elcsiga/react-streetview/blob/master/src/ReactStreetview.js
Modified the component for supporting dyanmic update of position based on this issue
Relevant issue: https://github.com/elcsiga/react-streetview/issues/13
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import asyncLoading from 'react-async-loader';

class ReactStreetView extends React.Component {

    constructor() {
        super();
        this.streetView = null;
        this.marker = null;
    }

    initialize(canvas) {
        if (this.props.googleMaps && this.streetView == null) {
            this.streetView = new this.props.googleMaps.StreetViewPanorama(
                canvas,
                this.props.streetViewPanoramaOptions
            );
            this.marker = new this.props.googleMaps.Marker({
                position: this.props.position,
                map: this.streetView,
            });

            this.streetView.addListener('position_changed', () => {
                if (this.props.onPositionChanged) {
                    this.props.onPositionChanged(this.streetView.getPosition());
                }
            });

            this.streetView.addListener('pov_changed', () => {
                if (this.props.onPovChanged) {
                    this.props.onPovChanged(this.streetView.getPov());
                }
            });

            this.streetView.addListener('pano_changed', () => {
                if (this.props.onPanoChanged) {
                    this.props.onPanoChanged(this.streetView.getPosition());
                }
            });
        }
    }

    componentDidMount() {
        this.initialize(ReactDOM.findDOMNode(this));
    }

    componentDidUpdate() {
        this.initialize(ReactDOM.findDOMNode(this));
    }

    componentWillUnmount() {
        if (this.streetView) {
            this.props.googleMaps.event.clearInstanceListeners(this.streetView);
        }
    }

    render() {

        if (this.streetView) {
            if (this.props.position) {
                this.streetView.setPosition(this.props.position);
                this.marker.setPosition(this.props.position);
            }
        }
        return (<div
            style={{
                height: '100%'
            }}
        ></div>);
    }
}

ReactStreetView.propTypes = {
    apiKey: PropTypes.string.isRequired,
    streetViewPanoramaOptions: PropTypes.object.isRequired,
    onPositionChanged: PropTypes.func,
    onPovChanged: PropTypes.func,
    onPanoChanged: PropTypes.func,
    position: PropTypes.object,
};

ReactStreetView.defaultProps = {
    streetViewPanoramaOptions: {
        position: {lat: 46.9171876, lng: 17.8951832},
        pov: {heading: 0, pitch: 0},
        zoom: 1
    }
};

function mapScriptsToProps(props) {
    const googleMapsApiKey = props.apiKey;
    return {
        googleMaps: {
            globalPath: 'google.maps',
            url: 'https://maps.googleapis.com/maps/api/js?key=' + googleMapsApiKey,
            jsonp: true
        }
    };
}

export default asyncLoading(mapScriptsToProps)(ReactStreetView);