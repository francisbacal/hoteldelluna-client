import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div className='container hero bg-secondary'>
            <div className="row justify-contetnt-center align-items-center h-100">
                <div className="col-12 text-center text-primary">
                    <h1>Ghost Room</h1>
                    <h3>404 - We know you can't see it</h3>
                    <p><Link className="link" to='/'>Back to Home</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Page404;