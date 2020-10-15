import { createSlice } from "@reduxjs/toolkit";



const cartslice = createSlice({
    name: "cart",
    initialState: { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
    reducers: {
        addtocart: (cart, action) => {
            const { cartItems, item } = action.payload;
            let alreadyExists = false;
            cartItems.map(x => {
                if (x._id === item._id) {
                    if (x.quantitycount)
                        x.quantitycount = x.quantitycount + item.quantitycount;
                    alreadyExists = true;
                }
            });
            if (!alreadyExists) {
                cartItems.push({ ...item });
            }

            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            return { cartItems };
        },
        removeItemFromCart: (state, action) => {
            return { cartItems: action.payload.cartItems };
        }
    }
});


//console.log(cartslice);

const { addtocart, removeItemFromCart } = cartslice.actions;
export default cartslice.reducer;


export const addToCart = (item) => (dispatch, getState) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    dispatch({
        type: addtocart.type,
        payload: { cartItems, item }
    });
};

export const removeFromCart = (item) => (dispatch, getState) => {
    const cartItems = getState().entities.cart.cartItems.slice().filter((x) => x._id !== item._id);

    dispatch({
        type: removeItemFromCart.type,
        payload: { cartItems }
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}




