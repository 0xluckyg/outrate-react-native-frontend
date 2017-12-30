import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image'
import {AppColors} from '../../helper/style'

class Cell extends Component {
    constructor(props) {
        super(props);        

        this.renderButtons = this.renderButtons.bind(this)
    }

    renderButtons() {
        return (
            <View style={{                             
                height: this.props.height * (2/3),
                marginRight: this.props.height * (1/6),
                justifyContent: 'center',
                flexDirection: 'row',                
                alignItems: 'flex-end',
            }}>
                {this.props.buttons.map((button, index) => {
                    return (
                        <TouchableOpacity 
                            style={{
                                flexDirection: 'column',                                
                                alignItems: 'center',
                                alignSelf: 'flex-end',     
                                marginLeft: 6,
                                marginRight: 6                           
                            }}
                            key={index}
                            onPress={button.onPress}
                        >
                            <Image style={{                                
                                tintColor: '#000',
                                width: this.props.height * 0.4,
                                height: this.props.height * 0.4,
                            }}source={button.image}></Image>
                            <Text style={{
                                fontSize: 8
                            }}>{button.text}</Text>
                        </TouchableOpacity>
                    )                    
                })}
            </View>            
        )        
    }

    render() {                
        return (            
                <View style={{
                    flexDirection: 'row',
                    alignItems:'center',                    
            
                    height: this.props.height,                    
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',

                        marginLeft: this.props.height * (1/4),
                        marginRight: this.props.height * (1/4)
                    }}>        
                        <View style={{
                            width: this.props.height * (2/3),
                            height: this.props.height * (2/3),                    
                            borderRadius: this.props.height * (1/3),
                            overflow: 'hidden',
                            backgroundColor: AppColors.appLightGray
                        }}>                
                            <FastImage style={{
                                flex: 1,
                                borderRadius: this.props.height * (1/3),
                            }} source={{
                                uri:this.props.data.profile,
                                priority: FastImage.priority.normal
                            }} resizeMode={
                                FastImage.resizeMode.contain
                            }
                            />
                        </View>
                    </View>
                    <View style={styles.rowContentStyle}>
                        <View>
                            <Text style={styles.topTextStyle}>{this.props.data.username}</Text>
                        </View>                        
                    </View>
                    {this.renderButtons()}
                </View>            
        )
    }
}

const styles = StyleSheet.create({
    rowContentStyle: {
        flexDirection: 'column',
        flex:1,
        justifyContent:'space-around',

        paddingTop: 10,
        paddingBottom: 10
    },    
    topTextStyle: {
        fontSize: 12,
        fontWeight: '400'
    },    
});

export default Cell;
