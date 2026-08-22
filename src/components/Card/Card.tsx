import styles from './Card.module.scss';
import type { PokemonCard } from '../../types';
import { useNavigate } from 'react-router';
import ChipList from '../ChipList/ChipList';
import StatList from '../StatList/StatList';



const Card = ({name, img, stats, types}: PokemonCard) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/pokemon/${name}`);
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.card__image}>
                <img src={img} alt={name} />
            </div>
            <div className={styles.card__content}>
                <h3 className={styles.card__title}>{name}</h3>
                <ChipList chipContentList={types} />
                <StatList stats={stats}/>
            </div>
        </div>
    );
};

export default Card;