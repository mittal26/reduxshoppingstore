import { combineReducers } from "redux";
import itemsReducer from "./items";
import cartReducer from "./cart";
import categoriesReducer from "./categories";
import userReducer from "./users";


export default combineReducers({
    items: itemsReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    users: userReducer
});