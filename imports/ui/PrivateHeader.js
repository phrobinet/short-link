import React from 'react';

const PrivateHeader = (props) => {

    return (
        <div>
            <h1>{props.title}</h1>
            <button onClick={() => Accounts.logout()}>Logout</button>
        </div>
    );
}
export default PrivateHeader;
