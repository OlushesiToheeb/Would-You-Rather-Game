import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Divider, Dimmer, Loader, Form, Segment } from 'semantic-ui-react';
import { handleSaveQuestion } from '../actions/shared';

const NewPoll = ({ authedUser, dispatch, history }) => {
    const [loading, setLoading] = useState(false);
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const disabled = optionOne === '' || optionTwo === '';

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(optionOne, optionTwo);
        dispatch(handleSaveQuestion(optionOne, optionTwo, authedUser));
        setLoading(true);
        setTimeout(() => {
            setOptionOne('');
            setOptionTwo('');
            setSubmitted(true);
            setLoading(true);
            history.push('/');
        }, 1000);
    };

    if (submitted) {
        return <Redirect to='/' />;
    }
    return (
        <Segment style={{ border: 'none', boxShadow: 'none' }}>
            <Dimmer active={loading === true}>
                <Loader size='big' disabled={loading === false}>
                    Loading
                </Loader>
            </Dimmer>
            <div className='teaser-body'>
                <div className='teaser-header-div'>
                    <h3 className='teaser-header'>Create New Poll</h3>
                </div>
                <div style={{ padding: '10px', marginTop: '10px' }}>
                    <p>
                        <strong>Would you rather...</strong>
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <input
                                name='optionOne'
                                placeholder='Enter First option...'
                                value={optionOne}
                                onChange={(e) => setOptionOne(e.target.value)}
                            />
                        </Form.Field>
                        <Divider horizontal>OR</Divider>

                        <Form.Field>
                            <input
                                name='optionTwo'
                                placeholder='Enter Second option...'
                                value={optionTwo}
                                onChange={(e) => setOptionTwo(e.target.value)}
                                required
                            />
                        </Form.Field>

                        <Form.Button
                            positive
                            size='tiny'
                            fluid
                            disabled={disabled}
                        >
                            Submit
                        </Form.Button>
                    </Form>
                </div>
            </div>
        </Segment>
    );
};

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    };
}

export default connect(mapStateToProps)(NewPoll);
