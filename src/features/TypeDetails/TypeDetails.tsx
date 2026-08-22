import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { selectTypeData } from './typeDetails-selectors';
import { useEffect } from 'react';
import { loadTypeData } from './typeDetails-slice';
import styles from './TypeDetails.module.scss';
import TypeBlock from '../../components/TypeBlock/TypeBlock';

interface TypeDetailsProps {
    type: string
}

const TypeDetails = ({type}: TypeDetailsProps) => {
    const dispatch = useAppDispatch();
    const typeData = useSelector(selectTypeData);

    useEffect(() => {
        dispatch(loadTypeData(type));
    }, [dispatch, type]);

    return (
        <>
            {
                typeData && (
                    <div className={`container ${styles.type__container}`}>
                        <div className={`img ${styles.type__icon}`}>
                            <img src={typeData.sprites['generation-ix']['scarlet-violet'].symbol_icon} alt={typeData.name} />
                        </div>
                        <div className={styles.type__data}>
                            <h2 className="h2">{typeData.name}</h2>
                            <div className={styles.type__stats}>
                                <TypeBlock title='Double Damage From' types={typeData.damage_relations.double_damage_from}/>
                                <TypeBlock title='Double Damage To' types={typeData.damage_relations.double_damage_to}/>
                                <TypeBlock title='Half Damage From' types={typeData.damage_relations.half_damage_from}/>
                                <TypeBlock title='Half Damage To' types={typeData.damage_relations.half_damage_to}/>
                                <TypeBlock title='No Damage From' types={typeData.damage_relations.no_damage_from}/>
                                <TypeBlock title='No Damage To' types={typeData.damage_relations.no_damage_to}/>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default TypeDetails;