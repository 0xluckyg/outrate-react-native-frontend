import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text,
    Dimensions,
    Animated,
    Easing,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import {CheckmarkImage} from '../../images/images'

import * as indicatorActions from '../../actions/indicatorActions';
import { connect } from 'react-redux';

const window = Dimensions.get('window');

class Toast extends Component {
    constructor(props) {
        super(props);
        
        this.visible = true;
        this.visibility = new Animated.Value(this.visible ? 0 : 1);
        this.toast = this.toast.bind(this);    
        this.checkOrText = this.checkOrText.bind(this);
    }

    toast(cont) {       
        let showDuration = 300;
        if (typeof this.props.show === typeof '') {
            showDuration = 1000;
        }

        if (!cont) {
            setTimeout(() => {                
                this.props.showToast(false);
                this.visible = true;                                                
            }, 200);                        
        }

        Animated.timing(this.visibility, {
            toValue: this.visible ? 1 : 0,
            duration: 300,
        }).start(() => {         
            if (this.props.show) {
                setTimeout(() => {         
                    this.visible = false;       
                    this.toast(false);                
                }, showDuration);
            }            
        });        
    }

    checkOrText() {        
        if (typeof this.props.show === typeof '') {
            let message = ''
            if (this.props.show.length > 60) {
                message = 'Please try again at a later time'
            } else {
                message = this.props.show
            }
            return (
                <View style={[styles.toast, styles.textToast]}>
                    <Text style={styles.textStyle}>{message}</Text>
                </View>
            )
        } else {
            return (
                <View style={[styles.toast, styles.circleToast]}>
                    <Image style={styles.checkMark} source={CheckmarkImage}></Image>
                </View>
            )
        }
     }    

    render() {        
        const animation = {
            opacity: this.visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.8],
            }),
            transform: [
                {
                    scale: this.visibility.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1.1, 1],
                    }),
                },
            ],
        }
        // const combinedStyle = Object.assign(animation, obj2);                
        if (this.props.show) {            
            this.toast(true);

            return (     
                <TouchableWithoutFeedback onPress={() => this.props.showToast(false)}>
                    <View style={styles.transparentView} >
                        <Animated.View style={{                             
                            zIndex: 999,    
                            opacity: this.visibility.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0.8],
                            }),
                            transform: [
                                {
                                    scale: this.visibility.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1.1, 1],
                                    }),
                                },
                            ],
                        }}>              
                            {this.checkOrText()}
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            )          
        } else {
            return null
        }              
    }
}

const styles = StyleSheet.create({
    transparentView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: window.height,
        width: window.width, 
        flex: 1,     
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 998
    },
    toast: {
        justifyContent: 'center',
        alignItems: 'center',        
    },
    textToast: {
        width: window.width * 0.5,                
        borderRadius: 20  
    },
    textStyle: {
        textAlign: 'center',
        margin: 16,
        fontFamily: 'Avenir',
        fontSize: 16,
        color: 'white'        
    },
    circleToast: {        
        width: 70,
        height: 70,

        borderRadius: 35        
    }, 
    checkMark: {
        height: 40,
        width: 40,
        tintColor: 'white'
    }
});

const mapStateToProps = (state) => {    
    return {
        show: state.indicator.showToast
    }
}

export default connect(mapStateToProps, indicatorActions)(Toast);