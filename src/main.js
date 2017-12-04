import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Router from './components/routes';

// import Spinner from './components/reusables/spinner';
// import Toast from './components/reusables/toast';

class Main extends Component {
    constructor() {
        super();
    }

    render() {        
        return (            
            <View style={styles.mainView}>                                
                {/* <Toast/>
                <Spinner/> */}
                <Router/>
            </View>            
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    }
});

export default Main;