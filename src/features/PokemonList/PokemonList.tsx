import { useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import { useAppDispatch} from '../../store';
import styles from './PokemonList.module.scss';
import { selectAllPokemons, selectCurrentPage, selectPageSize, selectPokemons, selectPokemonsCount, selectStatus } from './pokemons-selectors';
import { useEffect } from 'react';
import { loadPokemons, loadPokemonsByType, setCurrentPage, setPageSize } from './pokemons-slice';
import Pagination from '../../components/Pagination/Pagination';
import { selectControls } from '../Controls/controls-selectros';
import Preloader from '../../components/Preloader/Preloader';


const PokemonList = () => {
    const dispatch = useAppDispatch();
    const allPokemons = useSelector(selectAllPokemons);
    const pokemons = useSelector(selectPokemons);
    const totalCountPokemons = useSelector(selectPokemonsCount);
    const currentPage = useSelector(selectCurrentPage);
    const status = useSelector(selectStatus);
    const { search, type } = useSelector(selectControls);
    const pageSize = useSelector(selectPageSize);
    
    const pages = Math.ceil(totalCountPokemons / pageSize) ;

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
        const timer = setTimeout(() => {
            dispatch(loadPokemons({pokemonList: allPokemons, page: currentPage, search: search, pageSize}));
        }, 500);

        return () => {
            clearTimeout(timer);
        };
            
    }, [dispatch, currentPage, totalCountPokemons, search, allPokemons, pageSize]);

    useEffect(() => {
        const updatePageSize = () => {
            let newPageSize = pageSize;

            if (window.innerWidth < 768) {
                newPageSize = 10;
            } else if (window.innerWidth < 1440) {
                newPageSize = 21;
            } else if (window.innerWidth >= 1440) {
                newPageSize = 32;
            }

            dispatch(setPageSize(newPageSize));
            dispatch(setCurrentPage(1));
        };

        updatePageSize();

        window.addEventListener('resize', updatePageSize);

        return () => {
            window.removeEventListener('resize', updatePageSize);
        };
    }, [dispatch]);

    return (
        <>
            {
                status === 'loading'
                    ? <Preloader />
                    : (
                        <>
                            {
                                <>
                                    {
                                        status === 'error'
                                            ? <h2 className='h2 center'>Error load Data</h2>
                                            : (
                                                <>
                                                    {
                                                        (totalCountPokemons > 0)
                                                            ? (
                                                                <>
                                                                    <div className={styles.wrapper}>
                                                                        {pokemons.map(pokemon => {
                                                                            return <Card
                                                                                key={pokemon.name}
                                                                                name={pokemon.name}
                                                                                img={pokemon.img}
                                                                                stats={pokemon.stats}
                                                                                types={pokemon.types} />;
                                                                        })}
                                                                    </div>
                                                                    <Pagination
                                                                        currentPage={currentPage}
                                                                        totalPages={pages}
                                                                        onPageChange={changePage} />
                                                                </>
                                                            )
                                                            : <h2 className='h2 center'>No Data</h2>
                                                    }
                                                </>
                                            )
                                    }
                                </>
                    
                            }
                        </>
                    )
            }
        </>
    );
};

export default PokemonList;