import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Dropdown, Button } from 'semantic-ui-react';
import { getAllUsers } from '../actions/shared';
import '../styles/Login.scss';

const Login = ({ dispatch, userDetails }) => {
    const [user, setUser] = useState('');

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    const handleSetUser = (e, { value }) => setUser(value);

    const handleSetAuthedUser = () => {
        dispatch(setAuthedUser(user));
    };

    return (
        <form className='login_form' onSubmit={handleSetAuthedUser}>
            <>
                <h2>Would you rather</h2>
                <div className='login'>
                    <span>Login to play</span>
                    <Dropdown
                        placeholder='Select User'
                        fluid
                        selection
                        options={userDetails}
                        onChange={handleSetUser}
                        required
                        scrolling
                        style={{ marginBottom: '30px', marginTop: '20px' }}
                    />
                    <Button color={'green'} fluid disabled={user === ''}>
                        Sign In
                    </Button>
                </div>
            </>
        </form>
    );
};

const mapStateToProps = ({ users }) => {
    const userDetails = Object.values(users).map((user) => {
        return {
            key: user.id,
            text: user.name,
            value: user.id,
            image: {
                avatar: true,
                src: user.avatarURL,
            },
        };
    });

    return {
        users: Object.values(users),
        userDetails,
    };
};

export default connect(mapStateToProps)(Login);
