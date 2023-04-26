import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initialState = {
  sidebarShow: true,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = configureStore({ 
  reducer: changeState, 
  applyMiddleware: composeEnhancers( applyMiddleware( thunk ))
})

export default store
