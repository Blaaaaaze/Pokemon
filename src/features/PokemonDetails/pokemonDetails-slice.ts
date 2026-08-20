import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Ability, Extra, Pokemon, PokemonLocal, Status } from '../../types';
import { pokemonMapper } from '../../mappers/pokemonMapper';

export const loadPokemonData = createAsyncThunk<
PokemonLocal,
string,
{
    extra: Extra
}
>(
    '@@pokemon-details/load-pokemon-data',
    async (name, {
        extra: {client, api}
    }) => {
        const detailsFetch = await client.get<Pokemon>(api.pokemonData(name));
        const detailsData = detailsFetch.data;
        const abilities = detailsData.abilities;

        const abilitiesData: Ability[] = await Promise.all(
            abilities.map(async (item) => {
                const abilityFetch = await client.get(item.ability.url);
                return abilityFetch.data;
            })
        );
        const dataPokemonLocal = pokemonMapper(detailsData, abilitiesData);

        return dataPokemonLocal;
    }
);

interface PokemonDetailsSlice {
    status: Status,
    error: string | null,
    currentPokemon: PokemonLocal | null
}

const initialState: PokemonDetailsSlice = {
    status: 'idle',
    error: null,
    currentPokemon: null
};

const PokemonDetails = createSlice({
    name: '@@pokemon-details',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPokemonData.fulfilled, (state, action) => {
                state.currentPokemon = action.payload;
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
            });
    }
});

export const pokemonDetailsReducer = PokemonDetails.reducer;