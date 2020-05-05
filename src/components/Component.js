import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Component.scss';

class ComponentExample extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return <div className="component"></div>;
    }
}

export default ComponentExample;
