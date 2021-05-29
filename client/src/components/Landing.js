import {NavLink} from 'react-router-dom';
import './Landing.css';

export default function Landing() {
    return (
        <div className='landingBack'>
            <NavLink to='/home'>
                <button className="ingreso">
                    Ingresar al HenryDex!
                </button>
            </NavLink>
        </div>
    )
}