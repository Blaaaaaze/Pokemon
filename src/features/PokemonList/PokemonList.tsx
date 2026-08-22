import { useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import { useAppDispatch} from '../../store';
import styles from './PokemonList.module.scss';
import { selectAllPokemons, selectCurrentPage, selectPokemons, selectPokemonsCount } from './pokemons-selectors';
import { useEffect } from 'react';
import { loadPokemons, loadPokemonsByType, setCurrentPage } from './pokemons-slice';
import Pagination from '../../components/Pagination/Pagination';
import { selectControls } from '../Controls/controls-selectros';


const PokemonList = () => {
    const dispatch = useAppDispatch();
    const allPokemons = useSelector(selectAllPokemons);
    const pokemons = useSelector(selectPokemons);
    const totalCountPokemons = useSelector(selectPokemonsCount);
    const currentPage = useSelector(selectCurrentPage);
    const { search, type } = useSelector(selectControls);
    
    const pages = Math.ceil(totalCountPokemons / 20) ;

    const changePage = (newPage: number) => {
        if (newPage > 0 && newPage <= pages) {
            dispatch(setCurrentPage(newPage));
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        dispatch(loadPokemonsByType({pokemonType: type}));
    }, [type, dispatch]);

    useEffect(() => {
        if (totalCountPokemons) {
            const timer = setTimeout(() => {
                dispatch(loadPokemons({pokemonList: allPokemons, page: currentPage, search: search}));
            }, 500);

            return () => {
                clearTimeout(timer);
            };
            
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
                        />;
                    })
                }
            </div>
            <Pagination 
                currentPage={currentPage}
                totalPages={pages}
                onPageChange={changePage}
            />
        </>
    );
};

export default PokemonList;