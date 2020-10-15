import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from './api';


const slice = createSlice({
    name: "categories",
    initialState: {
        list: []
    },
    reducers: {
        categoryRecevied: (categories, action) => {
            categories.list = action.payload;
            categories.list.splice(0, 0, { _id: "", name: "All Items" });


        }
    }
});

export const { categoryRecevied } = slice.actions;
export default slice.reducer;


const url = "categorys";

export const loadCategory = () => apiRequest({
    url,
    onSuccess: categoryRecevied.type
});
