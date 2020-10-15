import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiRequest } from './api';
import moment from "moment";

const slice = createSlice({
    name: "items",
    initialState: {
        list: [],
        loading: true,
        lastfetch: null
    },
    reducers: {
        itemsRequested: (items, action) => {
            items.loading = true;
        },
        itemsReceived: (items, action) => {
            items.list = action.payload;
            items.loading = false;
            items.lastfetch = Date.now();
        },
        itemsRequestFailed: (items, action) => {
            items.loading = false
        },
        itemAdded: (items, action) => {
            items.list.push(action.payload);
        },
        itemEdited: (items, action) => {
            // items.list = action.payload;
            //const index = items.list.findIndex(item => item._id === action.payload._id);
            //items.list[index].liked = true;
        },
        itemDelete: (items, action) => {
            const newItems = items.list.filter((temp) => temp._id !== action.payload._id);
            items.list = newItems;
        },
        selectQuantityChange: (items, action) => {
            const { item: newItem, selectedQuantityCount } = action.payload;
            //console.log(action.payload.item._id);
            const index = items.list.findIndex(item => item._id === newItem._id);
            items.list[index].quantitycount = selectedQuantityCount;

        },
        hangleToggleLike: (items, action) => {
            const { item: newItem } = action.payload;
            const index = items.list.findIndex(item => item._id === newItem._id);
            items.list[index].liked = !items.list[index].liked;
        }
    }
});

//console.log(slice);

const { itemsReceived, itemsRequested, itemsRequestFailed, itemAdded, itemEdited, itemDelete, selectQuantityChange, hangleToggleLike } = slice.actions;
export default slice.reducer;


//actions
const url = "/items";
export const loadItems = () => (dispatch, getState) => {
    const { lastfetch } = getState().entities.items;

    const diffInMin = moment().diff(moment(lastfetch), 'minutes');

    if (diffInMin < 10) return;


    dispatch(apiRequest({
        url,
        onStart: itemsRequested.type,
        onSuccess: itemsReceived.type,
        onError: itemsRequestFailed.type
    }));

}

export const addItem = item => apiRequest({
    url,
    method: "post",
    data: item,
    onSuccess: itemAdded.type
});

export const editItem = (id) => apiRequest({
    url: url + '/' + id,
    method: "put",
    data: { title: "Apple", categoryId: "5ef03710a470f13b606b4ad9", price: 80, quantity: 1 },
    onSuccess: itemEdited.type
});

export const deleteItem = id => apiRequest({
    url: url + '/' + id,
    method: "delete",
    data: {},
    onSuccess: itemDelete.type

});

export const selectChange = ({ currentTarget: input }, item) => (dispatch, getState) => {
    const selectedQuantityCount = parseInt(input.value, 10);

    dispatch({
        type: selectQuantityChange.type,
        payload: { selectedQuantityCount, item }
    });

};

export const toggleLike = (item) => (dispatch, getState) => {
    dispatch({
        type: hangleToggleLike.type,
        payload: { item }
    });

};




//selector
export const getnoTitleItemsSelector = createSelector(
    state => state.entities.items.list,
    (items) => items.list.filter(item => !item.title)
)

