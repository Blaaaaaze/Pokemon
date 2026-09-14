import { setSearch, setType } from '../../features/Controls/controls-slice';
import { setCurrentPage } from '../../features/PokemonList/pokemons-slice';
import { useAppDispatch } from '../../store';
import styles from './Header.module.scss';
import { Link } from 'react-router';

const Header = () => {
    const dispatch = useAppDispatch();

    return (
        <header className={styles.header}>
            <h1 className={styles.header__title}>
                    Pokemon
            </h1>
            <nav className={styles.navigation}>
                <ul className={styles.navigation__list}>
                    <li className={styles.navigation__item}>
                        <Link to="/"
                            className={styles.navigation__link}
                            onClick={() => {
                                dispatch(setSearch(''));
                                dispatch(setType(''));
                                dispatch(setCurrentPage(1));
                            }}>
                            Pokedex
                        </Link>
                    </li>
                    <li className={styles.navigation__item}>
                        <Link to="/my-team"
                            className={styles.navigation__link}
                            onClick={() => {
                                dispatch(setSearch(''));
                                dispatch(setType(''));
                                dispatch(setCurrentPage(1));
                            }}>
                            My Team
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};


export default Header;