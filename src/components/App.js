import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { handleInitialData } from '../actions/shared';
import Login from './Login';
import Nav from './Nav';
import PollQuestion from './PollQuestion';
import PollResult from './PollResult';
import NewPoll from './NewPoll';
import LeaderBoard from './LeaderBoard';
import NotFound from './NotFound';
import '../styles/App.css';

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
                                        path='/questions/:question_id'
                                        component={PollQuestion}
                                    />
                                    <Route
                                        path='/results/:question_id'
                                        component={PollResult}
                                    />
                                    <Route path='/add' component={NewPoll} />
                                    <Route
                                        path='/leaderboard'
                                        component={LeaderBoard}
                                    />
                                    <Route
                                        path='/404-Page'
                                        component={NotFound}
                                    />
                                    <Route component={NotFound} />
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
