import { setSearch, setType } from '../../features/Controls/controls-slice';
import { setCurrentPage } from '../../features/PokemonList/pokemons-slice';
import { useAppDispatch } from '../../store';
import styles from './Header.module.scss';
import { Link } from 'react-router';

const Header = () => {
    const dispatch = useAppDispatch();

    return (
        <header className={styles.header}>
            <Link to="/"
                onClick={() => {
                    dispatch(setSearch(''));
                    dispatch(setType(''));
                    dispatch(setCurrentPage(1));
                }}>
                <h1 className={styles.header__title}>
                    Pokemon
                </h1>
            </Link>
        </header>
    );
};


export default Header;