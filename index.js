import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Main from './src/main';
// import {store} from './src/store';
import { Provider } from 'react-redux';

export default class Fash extends React.Component {
	render() {
		return (			
			// <Provider store={store}>
				<Main/>      		
			// </Provider>
		);
	}
}

AppRegistry.registerComponent('Fash', () => Fash);
