import React from 'react';

const UsersSection = ({ users }) => {
    return <>
        <div style={{ float: "left", width: "29%" }}>
            <h3 className="text-center">Users</h3>

            <div className="row px-3">

                {   users &&
                    users.map(u => <div className="col-12" key={`u-${u.nickname}`}>
                        > {u.nickname}
                    </div>)
                }

            </div>
        </div>
    </>
};

export default UsersSection;