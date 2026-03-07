import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import fclLogo from '../assets/FCLlogo1.png';


function Nav({setUserSignedIn, setUserTeamName}) {
    
    const navigate = useNavigate();


    const handleClick = () => {
        setUserSignedIn(false);
        navigate("/");
        
    }
    
        return(
        <div className='font-monofett'>
            <nav className='nav-bar'>
                <img src={fclLogo} alt='this is the site logo, its the letters f c l' className='nav-logo'></img>
                <ul className='nav-list'>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/ridersavailable">Available Riders</Link>
                    </li>
                    <li>
                        <Link to="/teampage">Team Page</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <button type='button' onClick={handleClick}>Sign Out</button>
                    </li>
                </ul>
            </nav>
        </div>
        
    );
};


export default Nav