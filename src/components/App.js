import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { handleInitialData } from '../actions/shared';

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
                        <p>Login</p>
                    ) : (
                        <div className='container'>
                            <p>nav</p>
                            <div className='app-body'>
                                <Route path='/' exact component={Dashboard} />
                                <Route
                                    path='/tweet/:id'
                                    // component={TweetPage}
                                />
                                <Route path='/new' />
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
