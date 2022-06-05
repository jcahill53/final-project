import React from 'react';

function Footer() {

    return (

        <footer>
            <div className="footer-container row">
                <p>Data provided by Marvel. © 2014 Marvel</p>
                <p>version: {process.env.REACT_APP_VERSION}</p>
            </div>
        </footer>
    )

}

export default Footer