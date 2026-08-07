import { useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import { useAppDispatch} from '../../store';
import styles from './PokemonList.module.scss';
import { selectCurrentPage, selectPokemons, selectPokemonsCount } from './pokemons-selectors';
import { useEffect } from 'react';
import { loadPokemons, setCurrentPage } from './pokemons-slice';
import Pagination from '../../components/Pagination/Pagination';


const PokemonList = () => {
    const dispatch = useAppDispatch();
    const pokemons = useSelector(selectPokemons);
    const totalCountPokemons = useSelector(selectPokemonsCount);
    const currentPage = useSelector(selectCurrentPage);
    const pages = totalCountPokemons / 20;

    const changePage = (newPage: number) => {
        //сюда потом прописать логику либо тоста об ошибке либо кнопку отключать на крайних страницах
        if (newPage > 0 && newPage < pages)
            dispatch(setCurrentPage(newPage));
    }

    useEffect(() => {
        dispatch(loadPokemons({page: currentPage}))
    }, [dispatch, currentPage])

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