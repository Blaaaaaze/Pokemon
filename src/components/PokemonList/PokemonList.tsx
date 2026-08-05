import Card from '../Card/Card';
import styles from './PokemonList.module.scss';

const PokemonList = () => {
    const mock = [1,2,3, 4,5,6]
    return (
        <>
            <div className={styles.wrapper}>
                {
                    mock.map(pokemon => {
                        return <Card key={pokemon}/>
                    })
                }
            </div>
        </>
    )
}

export default PokemonList;