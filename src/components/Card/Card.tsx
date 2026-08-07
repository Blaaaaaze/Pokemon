import styles from './Card.module.scss';
import type { PokemonCard } from '../../types';



const Card = ({name, img, stats, types}: PokemonCard) => {
    return (
        <div className={styles.card}>
            <div className={styles.card__image}>
                <img src={img} alt={name} />
            </div>
            <div className={styles.card__content}>
                <h3 className={styles.card__title}>{name}</h3>
                <div className={styles.card__icons}>

                </div>
                
            </div>
        </div>
    )
}

export default Card;