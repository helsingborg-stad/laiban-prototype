import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Fade = (WrappedComponent, data) => {
    return class Fade extends Component {
        state = {};

        componentDidMount() {}

        componentWillMount() {}

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};

export default Fade;
