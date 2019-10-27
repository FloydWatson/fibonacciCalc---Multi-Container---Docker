import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            im some other page
            <Link to="/">Go back home</Link> 
        </div>
    );
};

// example used to show nav. not a real page