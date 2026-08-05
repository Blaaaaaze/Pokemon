import styles from './Card.module.scss';
import charmander from '../../assets/imgs/Charmander.jpg';

const Card = () => {
    return (
        <div className={styles.card}>
            <div className={styles.card__image}>
                <img src={charmander} alt="pokename" />
            </div>
            <div className={styles.card__content}>
                <h3 className={styles.card__title}>Pokename</h3>
                <div className={styles.card__icons}>

                </div>
                
            </div>
        </div>
    )
}

export default Card;