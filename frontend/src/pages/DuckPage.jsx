import { useState } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router';
import DuckForm from '../components/DuckForm';
const DuckPage = () => {
    const { duckId } = useParams();
    const { ducks } = useOutletContext();
    const currDuck = ducks.find((d) => d.id === +duckId);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    if (!currDuck) return <div>An error occurred finding your duck!</div>;

    const { name, img_url, quote } = currDuck;

    const handleGoBack = () => {
        navigate(-1);
    };

    if (editing)
        return (
            <DuckForm duck={currDuck} method='PUT' setEditing={setEditing} />
        );
    return (
        <div className='hero bg-base-100 min-h-screen'>
            <div className='hero-content flex-col lg:flex-row'>
                <img src={img_url} className='max-w-sm rounded-lg shadow-2xl' />
                <div>
                    <h1 className='text-5xl font-bold'>{name}</h1>
                    <p className='py-6'>{quote}</p>
                    <div className='flex gap-4'>
                        <button
                            onClick={handleGoBack}
                            className='btn btn-primary'
                        >
                            Go back
                        </button>

                        <button
                            onClick={() => setEditing(true)}
                            className='btn btn-success'
                        >
                            Edit Duck
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DuckPage;
