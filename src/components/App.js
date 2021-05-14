import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { handleInitialData } from '../actions/shared';
import Login from './Login';
import Nav from './Nav';

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleInitialData());
    }

    render() {
        const { authedUser } = this.props;
        return (
            <Router>
                <>
                    {authedUser === null || authedUser === undefined ? (
                        <Login />
                    ) : (
                        <div className='container'>
                            <Nav />
                            <div className='app-body'>
                                <Switch>
                                    <Route
                                        path='/'
                                        exact
                                        component={Dashboard}
                                    />
                                    <Route
                                        path='/tweet/:id'
                                        // component={TweetPage}
                                    />
                                    <Route path='/new' />
                                </Switch>
                            </div>
                        </div>
                    )}
                </>
            </Router>
        );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    };
}

export default connect(mapStateToProps)(App);
