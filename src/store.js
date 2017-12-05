import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import profileReducer from './components/reducers/profileReducer';
import newsfeedReducer from './components/reducers/newsfeedReducer';

const reducers = combineReducers({      
    profile: profileReducer,
    newsfeed: newsfeedReducer
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

module.exports = {
    store
}
