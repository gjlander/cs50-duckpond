import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getDucks } from '../data/ducks';

const MainLayout = () => {
    const [ducks, setDucks] = useState([]);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        const refreshDucks = async () => {
            try {
                const allDucks = await getDucks();

                setDucks(allDucks);
            } catch (error) {
                console.error(error);
            } finally {
                setRefresh(false);
            }
        };

        if (refresh) refreshDucks();
    }, [refresh]);
    return (
        <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-grow flex flex-col justify-between py-4'>
                <Outlet context={{ ducks, setDucks, setRefresh, refresh }} />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
