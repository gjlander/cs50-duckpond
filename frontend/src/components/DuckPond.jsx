import { Link, useOutletContext } from 'react-router';
import DuckCard from './DuckCard';

const DuckPond = () => {
    const { ducks } = useOutletContext();

    return (
        <section
            id='pond'
            className='flex justify-center flex-wrap gap-4 p-4 w-full'
        >
            {ducks.map((duck) => (
                <Link key={duck.id} to={`ducks/${duck.id}`}>
                    <DuckCard {...duck} />
                </Link>
            ))}
        </section>
    );
};
export default DuckPond;
