import { HashRouter, Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Pokemon } from './pages/Pokemon';
import { Type } from './pages/Type';
import Header from './components/Header/Header';
import Team from './pages/Team';
import { Toaster } from 'sonner';

export const AppRouter = () => {
    return (
        <>
            <HashRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/pokemon/:name' element={<Pokemon />}/>
                    <Route path='/:type' element={<Type />}/>
                    <Route path='/my-team' element={<Team />}/>
                    <Route path='*' element={<Home /> }/>
                </Routes>
            </HashRouter>
            <Toaster />
        </>
    );
};