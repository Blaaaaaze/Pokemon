import { useSelector } from 'react-redux';
import { TeamSelector } from '../features/Team/team-selectors';
import CardList from '../components/CardList/CardList';
import { useAppDispatch } from '../store';
import { clearTeam } from '../features/Team/team-slice';

const Team = () => {
    const pokemons = useSelector(TeamSelector);
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="container">
                <button className='default-btn right' onClick={() => dispatch(clearTeam())}>Clear</button>
            </div>
            <CardList pokemons={pokemons}/>
        </>
    );
};

export default Team;