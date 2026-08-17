import { useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import { useAppDispatch} from '../../store';
import styles from './PokemonList.module.scss';
import { selectAllPokemons, selectCurrentPage, selectPokemons, selectPokemonsCount } from './pokemons-selectors';
import { useEffect } from 'react';
import { loadPokemons, loadPokemonsByType, setCurrentPage } from './pokemons-slice';
import Pagination from '../../components/Pagination/Pagination';
import { selectSearch, selectType } from '../Controls/controls-selectros';


const PokemonList = () => {
    const dispatch = useAppDispatch();
    const allPokemons = useSelector(selectAllPokemons);
    const pokemons = useSelector(selectPokemons);
    const totalCountPokemons = useSelector(selectPokemonsCount);
    const currentPage = useSelector(selectCurrentPage);
    const pages = totalCountPokemons / 20;
    const search = useSelector(selectSearch);
    const type = useSelector(selectType)

    const changePage = (newPage: number) => {
        //сюда потом прописать логику либо тоста об ошибке либо кнопку отключать на крайних страницах
        if (newPage > 0 && newPage < pages) {
            dispatch(setCurrentPage(newPage));
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }

    }

    useEffect(() => {
        dispatch(loadPokemonsByType(type));
    }, [type, dispatch])

    useEffect(() => {
        dispatch(setCurrentPage(1))
    }, [search])

    useEffect(() => {
        if (totalCountPokemons) {
            dispatch(loadPokemons({pokemonList: allPokemons, page: currentPage, search: search}));
        }
    }, [dispatch, currentPage, totalCountPokemons, search, allPokemons]);

    return (
        <>
            <div className={styles.wrapper}>
                {
                    pokemons.map(pokemon => {
                        return <Card 
                        key={pokemon.name}
                        name={pokemon.name}
                        img={pokemon.img}
                        stats={pokemon.stats}
                        types={pokemon.types}
                        />
                    })
                }
            </div>
            <Pagination 
            currentPage={currentPage}
            totalPages={pages}
            onPageChange={changePage}
            />
        </>
    )
}

export default PokemonList;