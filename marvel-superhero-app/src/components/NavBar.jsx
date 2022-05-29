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

                {/* start of header right */}
                {/* Hero name input */}
                <form id="hero-form">
                    <div className="form-group">
                        <label htmlFor="heroNameStart">Hero's Name Starts With:</label>
                        <input id="heroNameStart" name="nameShort" className="form-control" type="text"
                            placeholder="Enter at least 1 character" required pattern="[a-zA-Z\-\s]+" minLength="1"
                            title="Enter at least one character. Use only upper case, lower case, a space or hyphens" />
                    </div>
                </form>
                
                {/* submit button */}
                <div className="form-group">
                    <input id="submit" className="submit-btn" type="submit" value="Get Heros" />
                    <p>Save as default?</p>
                    <form className='radio'>
                        <input type="radio" id="favorite" name="fav_hero" value="Yes" />
                        <label htmlFor="favorite">Yes</label>
                        <input type="radio" id="notFavorite" name="fav_hero" value="No" checked />
                        <label htmlFor="notFavorite">Clear default</label>
                    </form>
                </div>


            </nav>

        </>
    )
}

export default NavBar