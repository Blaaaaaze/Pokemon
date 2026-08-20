import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PokemonTypeName } from '../../types';

type controlsSlice = {
    search: string,
    type: PokemonTypeName | ''
}

const initialState: controlsSlice = {
    search: '',
    type: ''
};

const controlsSlice = createSlice({
    name: '@@controls',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<PokemonTypeName | ''>) => {
            state.type = action.payload;
        },
        clearControls: () => initialState,
    }
});

export const controlsReducer = controlsSlice.reducer;
export const {setSearch, setType, clearControls} = controlsSlice.actions;