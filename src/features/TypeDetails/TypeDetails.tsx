import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { selectTypeData } from "./typeDetails-selectors";
import { useEffect } from "react";
import { loadTypeData } from "./typeDetails-slice";
import styles from './TypeDetails.module.scss';
import Chip from "../../components/Chip/Chip";

interface TypeDetailsProps {
    type: string
}

const TypeDetails = ({type}: TypeDetailsProps) => {
    const dispatch = useAppDispatch();
    const typeData = useSelector(selectTypeData);

    useEffect(() => {
            dispatch(loadTypeData(type));
        }, [dispatch, type])

    return (
        <>
        {
            typeData && (
                <div className={`container ${styles.type__container}`}>
                    <div className={`img ${styles.type__icon}`}>
                        <img src={typeData.sprites["generation-ix"]["scarlet-violet"].symbol_icon} alt={typeData.name} />
                    </div>
                    <div className={styles.type__data}>
                        <h2 className="h2">{typeData.name}</h2>
                        {/* Вот это надо рефаторить жестко */}
                        <div className={styles.type__stats}>
                            <div className={styles.type__stat}>
                                <h3 className={`h3 ${styles['sub-title']}`}>Double Damage From</h3>
                                <div className={styles.type__types}>
                                    {
                                        typeData.damage_relations.double_damage_from.map(type => {
                                            return <Chip text={type.name} key={`${type}-${type.name}`}/>
                                        })
                                    }
                                </div>
                            </div>
                            <div className={styles.type__stat}>
                                <h3 className={`h3 ${styles['sub-title']}`}>Double Damage To</h3>
                                <div className={styles.type__types}>
                                    {
                                        typeData.damage_relations.double_damage_to.map(type => {
                                            return <Chip text={type.name} key={`${type}-${type.name}`}/>
                                        })
                                    }
                                </div>
                            </div>
                            <div className={styles.type__stat}>
                                <h3 className={`h3 ${styles['sub-title']}`}>Half Damage From</h3>
                                <div className={styles.type__types}>
                                    {
                                        typeData.damage_relations.half_damage_from.map(type => {
                                            return <Chip text={type.name} key={`${type}-${type.name}`}/>
                                        })
                                    }
                                </div>
                            </div>
                            <div className={styles.type__stat}>
                                <h3 className={`h3 ${styles['sub-title']}`}>Half Damage To</h3>
                                <div className={styles.type__types}>
                                    {
                                        typeData.damage_relations.half_damage_to.map(type => {
                                            return <Chip text={type.name} key={`${type}-${type.name}`}/>
                                        })
                                    }
                                </div>
                            </div>
                            <div className={styles.type__stat}>
                                <h3 className={`h3 ${styles['sub-title']}`}>No Damage From</h3>
                                <div className={styles.type__types}>
                                    {
                                        typeData.damage_relations.no_damage_from.map(type => {
                                            return <Chip text={type.name} key={`${type}-${type.name}`}/>
                                        })
                                    }
                                </div>
                            </div>
                            <div className={styles.type__stat}>
                                <h3 className={`h3 ${styles['sub-title']}`}>No Damage To</h3>
                                <div className={styles.type__types}>
                                    {
                                        typeData.damage_relations.no_damage_to.map(type => {
                                            return <Chip text={type.name} key={`${type}-${type.name}`}/>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default TypeDetails;