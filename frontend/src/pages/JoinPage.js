import React from 'react';
import { useHistory } from 'react-router-dom';
import { getFormDataJsonFromEvent } from '../common/utils';

const JoinPage = () => {

    const history = useHistory();

    const onJoin = async event => {
        event.preventDefault();
        const formData = getFormDataJsonFromEvent(event);

        history.push(`/chat?room=${formData.room}&nickname=${formData.nickname}`);
    }

    return <>
        <form onSubmit={onJoin}>
            <div className="form-group">
                <label>Room</label>
                <input name="room" type="text" className="form-control" placeholder="Room..." required />
            </div>

            <div className="form-group">
                <label>Your nickname</label>
                <input name="nickname" type="text" className="form-control" placeholder="Nickname..." required />
            </div>

            <button type="submit" className="btn btn-primary">Join Room</button>
        </form>
    </>
};

export default JoinPage;