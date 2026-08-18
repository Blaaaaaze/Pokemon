import { BrowserRouter, Routes, Route } from "react-router"
import { Home } from "./pages/Home"
import { Pokemon } from "./pages/Pokemon"
import { Type } from "./pages/Type"
import Header from "./components/Header/Header"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/pokemon/:name' element={<Pokemon />}/>
                <Route path='/:type' element={<Type />}/>
            </Routes>
        </BrowserRouter>
    )
}