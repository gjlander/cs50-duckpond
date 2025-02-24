import { Link, NavLink } from 'react-router';
const Navbar = () => {
    return (
        <div className='navbar bg-slate-800 '>
            <div className='navbar-start'>
                <Link className='font-bold' to='/'>
                    The Duck Pond
                </Link>
            </div>

            <div className='navbar-end'>
                <ul className='menu menu-horizontal items-baseline gap-2'>
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='create'>Create Duck</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
