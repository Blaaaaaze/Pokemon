import type { ApiItem} from '../../types';
import Chip from '../Chip/Chip';
import styles from './TypeBlock.module.scss';

interface TypeBlock {
    title: string,
    types: ApiItem[]
}

const TypeBlock = ({title, types}: TypeBlock) => {
    return (
        <div className={styles.infoblock__container}>
            <h3 className={`h3 ${styles['infoblock__sub-title']}`}>{title}</h3>
            <div className={styles.infoblock__types}>
                {
                    types.map(type => {
                        return <Chip text={type.name} key={`${type}-${type.name}`}/>;
                    })
                }
            </div>
        </div>
    );
};

export default TypeBlock;