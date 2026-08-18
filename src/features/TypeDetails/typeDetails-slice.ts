import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Extra, Status, Type } from "../../types";

export const loadTypeData = createAsyncThunk<
Type,
string,
{
    extra: Extra
}
>(
    '@@type-details/load-type-data',
    async (type, {
        extra: {client, api}
    }) => {
        const detailsFetch = await client.get<Type>(api.Type(type));
        const detailsData = detailsFetch.data;

        return detailsData;
    }
)

interface TypeDetailsSlice {
    status: Status,
    error: string | null,
    currentType: Type | null
}

const initialState: TypeDetailsSlice = {
    status: 'idle',
    error: null,
    currentType: null
}

const TypeDetailsSlice = createSlice({
    name: '@@type-details',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadTypeData.fulfilled, (state, action) => {
                state.currentType = action.payload;
                state.status = 'idle';
                state.error = null;
            })
            .addMatcher((action) => action.type.endsWith('/rejected'), (state) => {
                state.status = 'error';
                state.error = 'Cannot load data';
            })
            .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
                state.status = 'loading';
                state.error = null;
            })
    }
});

export const typeDetailsReducer = TypeDetailsSlice.reducer;