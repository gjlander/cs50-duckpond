import { BrowserRouter, Routes, Route } from 'react-router';
import './styles.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import DuckPage from './pages/DuckPage';
import CreateDuck from './pages/CreateDuck';
import NotFound from './pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='ducks/:duckId' element={<DuckPage />} />
                    <Route path='create' element={<CreateDuck />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
