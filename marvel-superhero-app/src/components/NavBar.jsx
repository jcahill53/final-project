import React from 'react';
import logo from '../images/marvel2.png';


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

            </nav>

        </>
    )
}

export default NavBar