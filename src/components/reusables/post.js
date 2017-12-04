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
    Animated
} from 'react-native';
import Lightbox from 'react-native-lightbox';
import {
    plus,
    share
} from '../../images/images';
import Cell from './cell'
import Tags from './tags'

var width = Dimensions.get('window').width;

class Post extends Component {
    constructor(props) {
        super(props);		
				
        this.state = {
            value: 50,            
            isMoving: false
        };

        this.isMoving = this.isMoving.bind(this)
        this.calculateValue = this.calculateValue.bind(this)
    }

    calculateValue(movement) {        
        rangeTop = width * 0.7 + (width*0.15)
        rangeBottom = width * 0.15
        middle = width * 0.5
        unit = Math.round(width * 0.7 / 100)
        
        // if (position > 0) {
        //     this.setState({value:this.state.value+unit})
        // } else {
        //     this.setState({value:this.state.value-unit})
        // }
    }
    
    componentWillMount() {
        if (this.props.ratable) {
            this._panResponder = PanResponder.create({
                onMoveShouldSetResponderCapture: () => true,
                onMoveShouldSetPanResponderCapture: () => true,
            
                onPanResponderGrant: (e, gestureState) => {
                    console.log('Grant',gestureState);
                    this.setState({isMoving: true})
                },
            
                onPanResponderMove: (e, gestureState) => {                                        
                    console.log('gs', gestureState.moveX)
                    this.calculateValue(gestureState.moveX)
                },
                
                onPanResponderRelease: (e, gestureState) => {
                    console.log('Release',gestureState);
                    this.setState({isMoving: false, value: 50})                                        
                }                
            });
        } else {
            this._panResponder = ''
        }
    }      

    isMoving() {
        if (!this.state.isMoving) {
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
        return (
            <View style={styles.mainView}>
                <Cell 
                    height={60}
                    data={this.props.data.header}
                    buttons={[
                        { image: plus, text: 'Follow' },
                        { image: share, text: 'Share' }
                    ]}
                />
                <View {...this._panResponder.panHandlers}>                    
                    <TouchableOpacity
                        style={styles.imageView}
                        onPress={()=> this.props.goToOnPress({data: this.props.data})}
                        activeOpacity={1}
                    >
                        <ImageBackground style={styles.image} source={this.props.data.image.image}>
                            {this.isMoving()}                  
                        </ImageBackground>                    
                    </TouchableOpacity>                    
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

export default Post