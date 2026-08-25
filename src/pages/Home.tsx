import { useSearchParams } from 'react-router';
import Controls from '../features/Controls/Controls';
import PokemonList from '../features/PokemonList/PokemonList';
import { selectSearch, selectType } from '../features/Controls/controls-selectros';
import { useSelector } from 'react-redux';
import { selectCurrentPage } from '../features/PokemonList/pokemons-selectors';
import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { setSearch, setType } from '../features/Controls/controls-slice';
import { setCurrentPage } from '../features/PokemonList/pokemons-slice';
import type { FilterType } from '../types';

export const Home = () => {

    const search = useSelector(selectSearch);
    const type = useSelector(selectType);
    const page = useSelector(selectCurrentPage);
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const searchParam = searchParams.get('search') ?? '';
        const typeParam = searchParams.get('type') ?? '';
        const pageParam = Number(searchParams.get('page')) || 1;

        dispatch(setSearch(searchParam));
        dispatch(setType(typeParam as FilterType));
        dispatch(setCurrentPage(pageParam));
    }, [dispatch, searchParams]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams();

            if (search) {
                params.set('search', search);
            }

            if (type) {
                params.set('type', type);
            }
            if (page > 1) {
                params.set('page', String(page));
            }

            setSearchParams(params, { replace: true });
        }, 500);

        return () => clearTimeout(timer);
        
    }, [search, type, page, searchParams]);

    return (
        <>
            <Controls />
            <PokemonList />
        </>
    );
};