import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PokemonCard } from '../../types';

interface TeamSlice {
    pokemons: PokemonCard[]
};

const initialState: TeamSlice = {
    pokemons: []
};

const TeamSlice = createSlice({
    name: '@@Team',
    initialState,
    reducers: {
        addPokemon: (state, action: PayloadAction<PokemonCard>) => {
            state.pokemons.push(action.payload);
        },
        removePokemon: (state, action: PayloadAction<string>) => {
            state.pokemons.filter(pokemon => pokemon.name !== action.payload);
        },
        clearTeam: () => initialState,
    }
});

export const teamSliceReducer = TeamSlice.reducer;
export const {addPokemon, removePokemon, clearTeam} = TeamSlice.actions;