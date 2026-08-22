import type { PokemonStat } from '../../types';
import Stat from '../Stat/Stat';
import styles from './StatList.module.scss';

interface StatListProps {
    stats: PokemonStat[]
}

const StatList = ({stats}: StatListProps) => (
    <div className={styles.stats__container}>
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
);


export default StatList;