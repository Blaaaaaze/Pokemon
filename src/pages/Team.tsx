import { useSelector } from 'react-redux';
import { TeamSelector } from '../features/Team/team-selectors';
import CardList from '../components/CardList/CardList';

const Team = () => {
    const pokemons = useSelector(TeamSelector);

    return (
        <>
            <CardList pokemons={pokemons}/>
        </>
    );
};

export default Team;