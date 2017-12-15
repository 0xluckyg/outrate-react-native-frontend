import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {SET_SELF, SERVER, UPLOAD_POST, GET_TAGS} from '../../helper/constants'
import {store} from '../../store'
import * as indicatorActions from './indicatorActions';
import * as newsfeedActions from './newsfeedActions';
import * as profileActions from './profileActions';
import { Actions } from 'react-native-router-flux'
import { RNS3 } from 'react-native-aws3';

export const uploadPost = (uri, user_id, tags) => {
    const file = {        
        uri: uri,
        name: `${user_id}_${Date.now()}.png`,
        type: "image/png"
    }
    
    const options = {
        keyPrefix: "images/",
        bucket: "fash-object-storage",
        region: "us-east-1",
        accessKey: "AKIAJJ2S4KFVTSRYFSCA",
        secretKey: "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",
        successActionStatus: 201
    }
    

    return dispatch => {                        
        RNS3.put(file, options).then(response => {
            if (response.status !== 201) {
                throw new Error("Failed to upload image to S3");
            }            
            data = {
                user_id: user_id,
                tags: tags,
                image_url: response.body.postResponse.location
            }                        
            axios.post(SERVER+'/post', data).then(res => {                
                if (res.data.success) {                                        
                    Actions.pop()                    
                    store.dispatch(newsfeedActions.getRecentPosts());
                    store.dispatch(newsfeedActions.getTrendingPosts());
                    store.dispatch(profileActions.getUserPosts());
                    store.dispatch(indicatorActions.showToast(true))                                
                    dispatch(resolveUploadPost(true))                                
                } else {
                    console.log(res.data.message)
                }       
            })                   
        });
    }
}

export const resolveUploadPost = (success) => {
    return {
        type: UPLOAD_POST,
        success: success
    }
}