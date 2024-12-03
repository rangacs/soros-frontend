import React from 'react';

export default class ErrorBoundry extends React.Component {
    constructor() {
        super();
        this.state = {
            hasErrored: false
        };
    }

    static getDerivedStateFromError() {
        return { hasErrored: true };
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        const { hasErrored } = this.state;
        const { children } = this.props;
        if (hasErrored) {
            return <div>Something went wrong</div>;
        }
        return children;
    }
}
