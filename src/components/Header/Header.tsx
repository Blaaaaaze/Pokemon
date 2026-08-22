import styles from './Header.module.scss';
import { Link } from 'react-router';

const Header = () => (
    <header className={styles.header}>
        <Link to={'/'}>
            <h1 className={styles.header__title}>
                    Pokemon
            </h1>
        </Link>
    </header>
);


export default Header;