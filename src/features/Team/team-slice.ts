import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PokemonLocal } from '../../types';
import type { AppDispatch, RootState } from '../../store';

interface TeamSlice {
    pokemons: PokemonLocal[]
};

const initialState: TeamSlice = {
    pokemons: []
};

export const checkStateAndAddItem = (newItem: PokemonLocal) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { team } = getState();

    if(team.pokemons.length !== 6) {
        dispatch(addPokemon(newItem));
        return {
            success: true,
            message: 'Покемон добавлен в команду'
        };
    }
    return {
        success: false,
        message: 'Покемон не добавлен в команду. Достигнут лимит команды'    
    };
};

const TeamSlice = createSlice({
    name: '@@Team',
    initialState,
    reducers: {
        addPokemon: (state, action: PayloadAction<PokemonLocal>) => { 
            state.pokemons.push(action.payload);
        },
        removePokemon: (state, action: PayloadAction<string>) => {
            state.pokemons = state.pokemons.filter(pokemon => pokemon.name !== action.payload);
        },
        clearTeam: () => initialState,
    }
});

export const teamSliceReducer = TeamSlice.reducer;
export const {addPokemon, removePokemon, clearTeam} = TeamSlice.actions;