import type { PokemonType } from '../../types';
import Chip from '../Chip/Chip';
import styles from './ChipList.module.scss';

interface ChipListProps {
    chipContentList: PokemonType[]
}

const ChipList = ({chipContentList}: ChipListProps) => (
    <div className={styles.chips__container}>
        {
            chipContentList.map(type => (
                <Chip text={type.type.name} key={`${name}-${type.type.name}`}/>
            ))
        }
    </div>
);
export default ChipList;