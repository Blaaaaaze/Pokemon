import { useSelector } from 'react-redux';
import styles from './PokemonDetails.module.scss';
import { selectPokemonData, selectStatus } from './pokemonDetails-selectors';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';
import { loadPokemonData } from './pokemonDetails-slice';
import ChipList from '../../components/ChipList/ChipList';
import Preloader from '../../components/Preloader/Preloader';
import StatList from '../../components/StatList/StatList';

interface PokemonDetailsProps {
    name: string
}

const PokemonDetails = ({name}: PokemonDetailsProps) => {
    const dispatch = useAppDispatch();
    const pokemonData = useSelector(selectPokemonData);
    const status = useSelector(selectStatus);
    useEffect(() => {
        dispatch(loadPokemonData(name));
    }, [dispatch, name]);

    return (
        <>
            {   status === 'loading'
                ? <Preloader />
                :
                pokemonData && (
                    <>
                        <div className="container">
                            <div className='img'>
                                <img src={pokemonData.img} alt={pokemonData.name} />
                            </div>
                            <section className={styles.pokemon__data}>
                                <h2 className="h2">{pokemonData.name}</h2>
                                <div className={styles.pokemon__parametres}>
                                    <span className={styles.pokemon__parameter}>Weight: {pokemonData.weight}</span>
                                    <span className={styles.pokemon__parameter}>Height: {pokemonData.height}</span>
                                </div>
                                <ChipList chipContentList={pokemonData.types}/>
                                <h3 className={`h3 ${styles['pokemon__sub-title']}`}>Stats</h3>
                                <StatList stats={pokemonData.stats}/>
                            </section>
                        </div>
                        <section className={styles.abilities}>
                            <h3 className={`h3 ${styles['pokemon__sub-title']}`}>Abilities</h3>
                            <div className={styles.abilities__container}>
                                {
                                    pokemonData.abilities.map(ability => {
                                        return (
                                            <div className={styles.ability__card} key={ability.name}>
                                                <h4 className={styles['pokemon__sub-title']}>{ability.name}</h4>
                                                <p>{ability.description}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </section>
                    </>
                )
            }
        </>
    );
};

export default PokemonDetails;