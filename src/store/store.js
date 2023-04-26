import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";


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
  applyMiddleware: applyMiddleware( thunk )
})

export default store
