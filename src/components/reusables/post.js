import React, { Component } from 'react';
import {
    StyleSheet,
	View,
	TouchableOpacity,
	Text,
    Dimensions,
    FlatList,
    ImageBackground,
    PanResponder,
    Animated,
    TouchableWithoutFeedback
} from 'react-native';
import Lightbox from 'react-native-lightbox';
import {
    plus,
    share
} from '../../images/images';
import Cell from './cell'
import Tags from './tags'
import { connect } from 'react-redux';
import * as newsfeedActions from '../actions/newsfeedActions';

var width = Dimensions.get('window').width;

class Post extends Component {
    constructor(props) {
        super(props);		
				
        this.state = {
            value: 50,                        
            isTapped: false
        };

        this.isRating = this.isRating.bind(this)
        this.calculateValue = this.calculateValue.bind(this)
    }

    calculateValue(movement) {        
        rangeBottom = width * 0.2
        rangeTop = width * 0.6 + (width*0.2)        
        rangeMax = rangeTop - rangeBottom                
        position = Math.round((movement - rangeBottom) * (100/rangeMax))        
        if (position < 0) {
            position = 0
        }
        if (position > 100) {
            position = 100
        }
        this.setState({value:position})
    }
    
    componentWillMount() {
        if (this.props.ratable) {
            this._panResponder = PanResponder.create({
                onMoveShouldSetResponderCapture: () => true,
                onMoveShouldSetPanResponderCapture: () => true,                    
            
                onPanResponderMove: (e, gestureState) => {                       
                    if (this.state.isTapped) {
                        this.calculateValue(gestureState.moveX)
                        this.props.scroll(false)
                    }                                  
                },
                
                onPanResponderRelease: (e, gestureState) => {
                    if (this.state.isTapped) {
                        this.setState({isTapped: false})                                        
                        this.props.scroll(true)
                        this.props.ratePost(this.props.data._id, this.state.value)
                    }                    
                },     
                
                onPanResponderTerminate: (e, gestureState) => {
                    if (this.state.isTapped) {
                        this.setState({isTapped: false})
                        this.props.scroll(true)                        
                    }                    
                }     
            });
        } else {
            this._panResponder = ''
        }
    }      

    isRating() {
        if (!this.state.isTapped) {
            return (
                <View style={styles.imageFooter}>
                    <Text style={styles.ratingFooterText}>58</Text>
                    <Text style={styles.ratedByFooterText}>RATED BY 1880</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.ratingView}>
                    <Text style={styles.ratingText}>{this.state.value}</Text>
                    <Text style={styles.ratedByText}>RATED BY 1880</Text>
                </View>
            )
        }
    }

    render() {
        // console.log('POST',this.props.data)
        return (
            <View style={styles.mainView}>
                <Cell 
                    height={60}
                    data={this.props.data.owner}
                    buttons={[
                        { image: plus, text: 'Follow' },
                        { image: share, text: 'Share' }
                    ]}
                />
                <View {...this._panResponder.panHandlers}>                    
                    <TouchableWithoutFeedback
                            onPress={() => {                                
                                if (!this.state.isTapped) {
                                    this.setState({isTapped:true})
                                } else {
                                    this.setState({isTapped:false})
                                }
                            }}
                    >
                    <View
                        style={styles.imageView}                        
                        activeOpacity={1}
                    >
                            <ImageBackground style={styles.image} source={{uri:this.props.data.image_url}}>
                                {this.isRating()}                  
                            </ImageBackground>                          
                    </View>                    
                    </TouchableWithoutFeedback>                  
                </View>
                <Tags tags={this.props.data.tags}/>            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        width: width,
    },
    imageView: {
        // flex: 1,
        width: width,
        height: width * 0.9,
    },
    image: {
        flex: 1,          
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    ratingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: width * 0.9,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    imageFooter: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 60,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',        
    },
    ratingText:{
        textAlign: 'center',
        color: 'white',
        fontSize: 70
    },
    ratedByText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    },
    ratingFooterText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 50,
        margin: 7,
        marginLeft: 15
    },
    ratedByFooterText: {
        color: 'white',
        alignSelf: 'flex-end',
        fontSize: 12,
        margin: 5
    }
});

export default connect(null, newsfeedActions)(Post)