import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
    Text,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import {
	back
} from '../../images/images';
import Post from '../reusables/post'
import { Actions } from 'react-native-router-flux'
import {AppColors} from '../../helper/style'

const Header = ({headerText}) => {    

    return(
        <View style={styles.navStyle}>
            <TouchableOpacity style={styles.back} onPress={() => Actions.pop()}>
                <Image style={styles.backImage} source={back}></Image>
            </TouchableOpacity>
            <Text style={styles.title}>{headerText}</Text>                        
        </View>
    )
}


class PostView extends Component {
    constructor(props) {
        super(props);		
				
        
    }
    
    render() {        
        return (
			<View style={styles.mainView}>     
                <Header headerText='Swipe to rate!'/>                
                <Post
                    data={this.props.data}                    
                    ratable={true}                    
                    goToOnPress={() => {}}                    
                />                
			</View>
        );
    }
}

const styles = StyleSheet.create({
	mainView: {
        flex: 1,     
        backgroundColor: '#fff'   
    },
    navStyle:{  
        marginTop: 20,
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

export default PostView