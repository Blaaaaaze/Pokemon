import styles from './Card.module.scss';
import type { PokemonCard } from '../../types';
import Chip from '../Chip/Chip';
import Stat from '../Stat/Stat';
import { useNavigate } from 'react-router';



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
                <div className={styles.card__types}>
                    {
                        types.map(type => (
                            <Chip text={type.type.name} key={`${name}-${type.type.name}`}/>
                        ))
                    }
                </div>
                <div className={styles.card__stats}>
                    {
                        stats.map(stat => {
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
                
            </div>
        </div>
    );
};

export default Card;