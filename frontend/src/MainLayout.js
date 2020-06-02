import React from 'react';

const MainLayout = (props) => {
    return <>
        <div className="d-flex">
            <div className="container-fluid p-3">

                {props.children}

            </div>
        </div>
    </>
};

export default MainLayout;