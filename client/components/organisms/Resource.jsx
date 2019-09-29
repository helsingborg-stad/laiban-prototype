import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Resource extends Component {
    state = { data: {}, isFetching: true };

    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
        render: PropTypes.func.isRequired,
        headers: PropTypes.object,
        body: PropTypes.object,
        onMount: PropTypes.func,
        onUnmount: PropTypes.func,
    };

    static defaultProps = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    componentDidMount() {
        try {
            this.fetchResource();
        } catch (e) {
            console.error(e);
        }
    }

    fetchResource = async () => {
        const { endpoint, method, headers, body, onMount } = this.props;

        if (typeof onMount !== 'undefined') {
            onMount();
        }

        const params = {};

        params.method = method;

        if (typeof body === 'object' && Object.keys(body).length > 0) {
            params.body = JSON.stringify(body);
        }

        if (typeof headers === 'object' && Object.keys(headers).length > 0) {
            params.headers = headers;
        }

        const response = await fetch(endpoint, params);
        const json = await response.json();

        this.setState({ data: json, isFetching: false });
    };

    componentWillUnmount() {
        const { onUnmount } = this.props;

        if (typeof onUnmount !== 'undefined') {
            onUnmount();
        }
    }

    render() {
        const { data, isFetching } = this.state;
        const { render } = this.props;

        if (isFetching) {
            return null;
        }

        return <div>{render(data)}</div>;
    }
}
