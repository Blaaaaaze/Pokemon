import { useNavigate } from 'react-router';
import styles from './Chip.module.scss';

interface ChipProps {
    text: string;
}

const Chip = ({text}: ChipProps) => {
    const navigate = useNavigate();
    const handleClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        navigate(`/${text}`);
    };

    return (
        <div className={`${styles.chip} ${styles[text]}`} onClick={(e) => handleClick(e)}>
            <p className={styles.chip__text}>{text}</p>
        </div>
    );
};

export default Chip;