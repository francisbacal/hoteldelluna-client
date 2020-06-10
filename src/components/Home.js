import React from "react";

import herobanner from './../assets/images/herobanner.jpg';

function Home() {
    return (
        <>
            <div className="hero no-gutters">
                <div className="hero-banner" style={{ backgroundImage: "url("+herobanner+")" }}>
                </div>
                <div className="hero-message">
                    <h2>DEL LUNA</h2>
                </div>
            </div>
            <div className="row no-gutters">
                <div className="col-12">

                </div>
            </div>
        </>
    );
}

export default Home;