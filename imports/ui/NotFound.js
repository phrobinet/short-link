import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="boxed-view">
            <div className="boxed-view__box">
                <h1>404 Page Not Found</h1>
                <p>Hmmmm, we're unable to find that page</p>
                <Link to="/"className="button button--link">HEAD HOME</Link>
            </div>

        </div>
    );
}

export default NotFound;

