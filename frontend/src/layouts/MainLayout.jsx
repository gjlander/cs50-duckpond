import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import AuthContextProvider from '../context/AuthContextProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getDucks } from '../data/ducks';

const MainLayout = () => {
    const [ducks, setDucks] = useState([]);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        let ignore = false;
        const refreshDucks = async () => {
            try {
                const allDucks = await getDucks();
                if (!ignore) {
                    setDucks(allDucks);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setRefresh(false);
            }
        };

        if (refresh) refreshDucks();

        return () => {
            ignore = true;
        };
    }, [refresh]);
    return (
        <AuthContextProvider>
            <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
                <Navbar />
                <main className='flex-grow flex flex-col justify-between py-4'>
                    <Outlet context={{ ducks, setDucks, setRefresh }} />
                </main>
                <Footer />
            </div>
        </AuthContextProvider>
    );
};

export default MainLayout;
