import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from './favorites'

export const store = configureStore({
    reducer: {
        favoriteMeals : favoritesReducer
    }// 키를 객체로 전달
});