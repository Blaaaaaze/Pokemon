import { useSelector } from 'react-redux';
import { TeamSelector } from '../features/Team/team-selectors';
import CardList from '../components/CardList/CardList';
import { useAppDispatch } from '../store';
import { clearTeam, LIMIT_OF_POWER } from '../features/Team/team-slice';
import ProgressBar from '../components/ProgressBar/ProgressBar';

const Team = () => {
    const pokemons = useSelector(TeamSelector);
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="container">
                <button className='default-btn right' onClick={() => dispatch(clearTeam())}>Clear</button>
            </div>
            <ProgressBar limit={LIMIT_OF_POWER} power={pokemons.reduce((res, poke) => res + poke.power, 0)}/>
            <CardList pokemons={pokemons}/>
        </>
    );
};

export default Team;