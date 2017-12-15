import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import profileReducer from './components/reducers/profileReducer';
import newsfeedReducer from './components/reducers/newsfeedReducer';
import indicatorReducer from './components/reducers/indicatorReducer';

const reducers = combineReducers({      
    profile: profileReducer,
    newsfeed: newsfeedReducer,
    indicator: indicatorReducer,    
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

module.exports = {
    store
}
