import { useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import { useAppDispatch, type RootState } from '../../store';
import styles from './PokemonList.module.scss';
import { selectAllPokemons } from './pokemons-selectors';
import { useEffect } from 'react';
import { loadPokemons } from './pokemons-slice';


const PokemonList = () => {
    const dispatch = useAppDispatch();
    const pokemons = useSelector((state: RootState) => selectAllPokemons(state));
    console.log(1);
    useEffect(() => {
        dispatch(loadPokemons())
    }, [dispatch])
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
        </>
    )
}

export default PokemonList;