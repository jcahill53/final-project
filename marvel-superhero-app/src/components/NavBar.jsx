import React from 'react';
import logo from '../images/marvel2.png';
import { Link  } from 'react-router-dom';

function NavBar() {


    return (
        <>
            <header>
                {/* input background image via css  */}
            </header>

            <nav>
                <section className="hdr-left">
                    <img className="logo" src={logo} alt="Marvel logo" />
                    <h1>Superhero Search</h1>
                </section>
                {/* end of hdr-left */}
                <section className="hdr-right">
                <ul className="nav-links">
                    <li  ><Link to="/">Return to Home</Link></li>
                </ul>
                </section>
            </nav>

        </>
    )
}

export default NavBar