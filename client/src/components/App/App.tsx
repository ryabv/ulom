import React, { FC } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Layout from '../Layout/Layout';

interface AppProps {
    testStore?: any
}

const App: FC<AppProps> = ({ testStore }) => {
    return (
        <Layout />
    );
};

export default connect(
    state => ({
        testStore: state
    }),
    dispatch => ({})
)(App);
