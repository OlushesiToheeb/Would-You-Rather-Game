import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Button, Radio } from 'semantic-ui-react';
import { handleSaveQuestionAnswer } from '../actions/shared';

const PollQuestion = ({
    questionData,
    match,
    authedUser,
    validId,
    dispatch,
}) => {
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(false);

    const handleChange = (e, { value }) => setValue(value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { question_id } = match.params;
        dispatch(handleSaveQuestionAnswer(authedUser, question_id, value));
        setAnswer(true);
    };

    if (answer) {
        return <Redirect to={`/results/${match.params.question_id}`} />;
    }

    if (questionData.Answered) {
        return <Redirect to='/' />;
    }

    if (!validId) {
        return <Redirect to='/' />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='teaser-body'>
                <div className='teaser-header-div'>
                    <h3 className='teaser-header'>
                        {questionData.author} asks:
                    </h3>
                </div>
                <div className='teaser-inner-div'>
                    <div className='teaser-image-div'>
                        <img
                            src={questionData.avatar}
                            alt={`${questionData.avatar} avatar`}
                            className='teaser-image'
                        />
                    </div>
                    <div className='teaser-info-div'>
                        <h3 className='teaser-info-header'>Would you rather</h3>
                        <div className='teaser-info'>
                            <Radio
                                label={questionData.optionOne}
                                name='radioGroup'
                                value='optionOne'
                                checked={value === 'optionOne'}
                                onChange={handleChange}
                            />
                            <br />
                            <br />
                            <Radio
                                label={questionData.optionTwo}
                                name='radioGroup'
                                value='optionTwo'
                                checked={value === 'optionTwo'}
                                onChange={handleChange}
                            />
                        </div>

                        <Button color={'green'} fluid disabled={value === ''}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

const mapStateToProps = ({ users, questions, authedUser }, { match }) => {
    const { question_id } = match.params;
    const validateId = Object.keys(questions).includes(question_id);
    if (!validateId) {
        return {
            validId: false,
        };
    }
    const questionAuthor = users[questions[question_id].author];
    const questionData = {
        author: questionAuthor.name,
        avatar: questionAuthor.avatarURL,
        optionOne: questions[question_id].optionOne.text,
        optionTwo: questions[question_id].optionTwo.text,
        Answered: Object.keys(users[authedUser].answers).includes(question_id),
    };

    return {
        questionData,
        authedUser,
        validId: true,
    };
};

export default withRouter(connect(mapStateToProps)(PollQuestion));
