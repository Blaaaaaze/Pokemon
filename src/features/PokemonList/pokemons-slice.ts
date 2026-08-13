import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Extra, Pokemon, PokemonCard, PokemonListItem, Status } from "../../types";
import { pokemonMapperToCard } from "../../mappers/pokemonMapper";
import type { RootState } from "../../store";

export const loadAllPokemonsList = createAsyncThunk<
{
    pokemonList: PokemonListItem[],
    count: number
},
undefined,
{
    extra: Extra
}
>(
    '@@pokemons/load-all-pokemons',
    async (_, {
        extra: {client, api}
    }) => {
        const pokemonFetch = await client.get(api.allPokemons);
        const pokemonList = pokemonFetch.data.results;
        const count = pokemonFetch.data.count;

        return {pokemonList, count};
    }
)

export const loadPokemon = createAsyncThunk<
    PokemonCard[],
    PokemonListItem,
    {
        extra: Extra
    }
>(
    '@@pokemon/load-pokemon-information',
    async (pokemonItem, {
        extra: {client}
    }) => {
        const pokemonFetch = await client.get(pokemonItem.url);
        const pokemonData = pokemonMapperToCard(pokemonFetch.data);

        return pokemonData;
    }
)

export const loadPokemons = createAsyncThunk<
PokemonCard[], 
{page: number},
{
    extra: Extra,
    state: RootState
}
>(
    '@@pokemons/load-pokemons',
    async ({ page }, {
        extra: {client},
        getState,
    }) => {
        const start = (page - 1) * 20;
        const pokemonsSlice = getState().pokemons.allPokemonsList.slice(start, start+getState().pokemons.pageSize || -1);

        const pokemonsData: Pokemon[] = await Promise.all(
            pokemonsSlice.map(async (pokemonItem: PokemonListItem) => {
                const pokemonInfo = await client.get(pokemonItem.url);
                return pokemonInfo.data;
            })
        )
        const pokemonList = pokemonMapperToCard(pokemonsData);

        return pokemonList;
    }
)

type PokemonSlice = {
    status: Status,
    currentPage: number,
    pageSize: number,
    totalCount: number
    error: string | null,
    pagePokemonsList: PokemonCard[]
    allPokemonsList: PokemonListItem[],
}

const initialState: PokemonSlice = {
    status: 'idle',
    currentPage: 1,
    pageSize: 20,
    totalCount: 0,
    error: null,
    pagePokemonsList: [],
    allPokemonsList: []
}


const pokemonSlice = createSlice({
    name: '@@pokemons',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPokemons.fulfilled, (state, action) => {
                state.status = 'idle';
                state.pagePokemonsList = action.payload;
            })
            .addCase(loadAllPokemonsList.fulfilled, (state, action) => {
                state.status = 'idle';
                state.allPokemonsList = action.payload.pokemonList;
                state.totalCount = action.payload.count
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

export const pokemonReducer = pokemonSlice.reducer;
export const {setCurrentPage} = pokemonSlice.actions;