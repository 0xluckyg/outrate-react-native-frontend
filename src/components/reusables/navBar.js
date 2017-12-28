import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
    Text,
    Image
} from 'react-native';
import {back} from '../../images/images'
import {AppColors} from '../../helper/style'

class NavBar extends Component {
    render() {
       return (        
           <View>
               <View style={styles.filler}>
               </View>
                <View style={styles.navStyle}>
                    <TouchableOpacity style={styles.back} onPress={this.props.backAction}>
                        <Image style={styles.backImage} source={back}></Image>
                    </TouchableOpacity>
                    <Text style={styles.title}>{this.props.headerText}</Text>                        
                </View>                        
            </View>
        )
    }
}

const styles = StyleSheet.create({	
    filler: {
        height: 20,
        backgroundColor: 'white',        
    },
    navStyle:{          
        backgroundColor:'#fff',      
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        height:40,        
        borderBottomWidth: 0.5,
        borderColor: AppColors.appGray,        
    },
    back:{
        position: 'absolute',
        left: 10,                
    },
    backImage:{
        height: 25,
        width: 25,        
    },
    title:{
        fontSize:20,
        position: 'absolute',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        flex: 1
    }
});

export default NavBar;
