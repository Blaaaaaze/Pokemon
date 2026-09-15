import type { PokemonCard } from '../../types';
import Card from '../Card/Card';
import styles from './CardList.module.scss';

interface CardListProps {
    pokemons: PokemonCard[]
}

const CardList = ({pokemons}: CardListProps) => (
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
);

export default CardList;