import { useSelector } from 'react-redux';
import styles from './PokemonDetails.module.scss';
import { selectPokemonData } from './pokemonDetails-selectors';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';
import { loadPokemonData } from './pokemonDetails-slice';
import Chip from '../../components/Chip/Chip';
import Stat from '../../components/Stat/Stat';
import ChipList from '../../components/ChipList/ChipList';

interface PokemonDetailsProps {
    name: string
}

const PokemonDetails = ({name}: PokemonDetailsProps) => {
    const dispatch = useAppDispatch();
    const pokemonData = useSelector(selectPokemonData);

    useEffect(() => {
        dispatch(loadPokemonData(name));
    }, [dispatch, name]);

    return (
        <>
            {
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
                                <div className={styles.pokemon__stats}>
                                    {
                                        pokemonData.stats.map(stat => {
                                            return (
                                                <Stat 
                                                    name={stat.stat.name}
                                                    value={stat.base_stat}
                                                    key={`${name}-${stat.stat.name}`}
                                                /> 
                                            );
                                        })
                                    }
                                </div>
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