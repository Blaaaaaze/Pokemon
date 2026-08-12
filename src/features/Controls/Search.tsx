import styles from './Controls.module.scss';

const Search = () => {
    return (
        <>
            <input 
                type="text"
                placeholder="Enter pokemon name"
                className={styles.search}
                name="PokemonSearch"
            />

        </>
    )
}

export default Search;