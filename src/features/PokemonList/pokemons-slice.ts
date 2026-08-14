import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Extra, Pokemon, PokemonCard, PokemonListItem, Status } from "../../types";
import { pokemonListMapper, pokemonMapperToCard } from "../../mappers/pokemonMapper";
import type { AppDispatch, RootState } from "../../store";

interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

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
        const pokemonFetch = await client.get<PokemonListResponse>(api.allPokemons);
        const pokemonList = pokemonFetch.data.results;
        const count = pokemonFetch.data.count;

        return {pokemonList, count};
    }
);

export const loadPokemonsByType = createAsyncThunk<
    undefined,
    string,
    {
        extra: Extra,
        state: RootState,
        dispatch: AppDispatch
    }
>(
    '@@pokemons/load-pokemons-by-type',
    async (pokemonType, {
        extra: {client, api},
        getState,
        dispatch
    }) => {
        console.log(1)
        const pokemonFetch = await client.get(api.pokemonsByType(pokemonType));
        const pokemonList = pokemonFetch.data.pokemon;
        const page = 1;
        const search = getState().controls.search;
        const mappedPokemonList = pokemonListMapper(pokemonList);
        


        dispatch(loadPokemons({pokemonList: mappedPokemonList, page, search})).unwrap();
    }
)

export const loadPokemons = createAsyncThunk<
PokemonCard[], 
{
    pokemonList: PokemonListItem[],
    page: number,
    search: string,
},
{
    extra: Extra,
    state: RootState
}
>(
    '@@pokemons/load-pokemons',
    async ({ pokemonList, page, search }, {
        extra: {client},
        getState,
    }) => {
        // console.log(`${page}, ${search}`);
        // console.log(pokemonList)
        const start = (page - 1) * 20;
        const pokemonsSlice = pokemonList
            .filter(pokemon => pokemon.name.includes(search.trim()))
            .slice(start, start+getState().pokemons.pageSize || -1);

        const pokemonsData: Pokemon[] = await Promise.all(
            pokemonsSlice.map(async (pokemonItem: PokemonListItem) => {
                const pokemonInfo = await client.get(pokemonItem.url);
                return pokemonInfo.data;
            })
        )
        const pokemonCardsData = pokemonMapperToCard(pokemonsData);

        return pokemonCardsData;
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