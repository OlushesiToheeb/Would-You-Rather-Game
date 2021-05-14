import React from 'react';
import { connect } from 'react-redux';

import { Menu, Image } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { logOutUser } from '../actions/authedUser';

const Nav = ({ dispatch, location, user }) => {
    const handleSignOut = () => {
        dispatch(logOutUser());
    };
    const { pathname } = location;

    return (
        <>
            <Menu pointing secondary tabular size={'massive'} stackable>
                <Menu.Item
                    as={Link}
                    to='/'
                    name='home'
                    active={pathname === '/'}
                />
                <Menu.Item
                    as={Link}
                    to='/new-poll'
                    name='new poll'
                    active={pathname === '/new-poll'}
                />
                <Menu.Item
                    as={Link}
                    to='/leaderboard'
                    name='leaderboard'
                    active={pathname === '/leaderboard'}
                />
                <Menu.Menu position='right'>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '10px' }}>
                            Hi {user.name}
                        </span>
                        <Image
                            src={user.avatarURL}
                            avatar
                            circular={true}
                            alt={user.name}
                            verticalAlign={'bottom'}
                            className={'nav-avatar'}
                        />
                    </span>
                    <Menu.Item name='logout' onClick={handleSignOut} />
                </Menu.Menu>
            </Menu>
        </>
    );
};

function mapStateToProps({ users, authedUser }) {
    return {
        user: users[authedUser],
    };
}

export default withRouter(connect(mapStateToProps)(Nav));
