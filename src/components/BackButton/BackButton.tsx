import { useNavigate } from 'react-router';
import styles from './BackButton.module.scss';

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button className={`${styles['back-btn']} default-btn`} onClick={() => navigate(-1)}>Back</button>
    );
};

export default BackButton;