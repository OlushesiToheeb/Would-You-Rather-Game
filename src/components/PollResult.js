import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';
import ResultUI from './ResultUI';
import '../styles/Teaser.scss';

const PollResult = ({
    user: { name, avatarURL },
    userData,
    highest,
    validId,
    history,
    totalVotes,
}) => {
    const handleClick = () => {
        history.push('/');
    };

    if (!validId) {
        <Redirect to='/404-Page' />;
    }
    return (
        <div className='teaser-body'>
            <div className='teaser-header-div'>
                <h2 className='teaser-header'>Asked by {name}</h2>
            </div>
            <div className='teaser-inner-div'>
                <div className='result-image-div'>
                    <img
                        src={avatarURL}
                        alt={`${name} avatar`}
                        className='teaser-image'
                    />
                </div>
                <div className='question-info-div'>
                    <h3 className='question-info-header'>Results</h3>
                    <h5>Would you rather...</h5>
                    <ResultUI
                        userData={userData}
                        highest={highest}
                        totalVotes={totalVotes}
                    />
                    <Button size='tiny' floated='right' onClick={handleClick}>
                        Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ users, authedUser, questions }, { match }) => {
    const { question_id } = match.params;
    const user = users[questions[question_id].author];
    const validateId = Object.keys(questions).includes(question_id);
    if (!validateId) {
        return {
            validId: false,
        };
    }
    const question = questions[question_id];
    const totalVotes =
        question.optionOne.votes.length + question.optionTwo.votes.length;
    const highestVotes = (optionOne, optionTwo) => {
        if (optionOne === optionTwo) {
            return null;
        }
        return Math.max(optionOne, optionTwo);
    };

    const highest = highestVotes(
        question.optionOne.votes.length,
        question.optionTwo.votes.length
    );

    const userData = [
        {
            userVoted: question.optionOne.votes.includes(authedUser)
                ? true
                : false,
            noOfVotes: question.optionOne.votes.length,
            percentVote: (
                +(question.optionOne.votes.length / totalVotes) * 100
            ).toFixed(1),
            text: question.optionOne.text,
        },
        {
            userVoted: question.optionTwo.votes.includes(authedUser)
                ? true
                : false,
            noOfVotes: question.optionTwo.votes.length,
            percentVote: (
                +(question.optionTwo.votes.length / totalVotes) * 100
            ).toFixed(1),
            text: question.optionTwo.text,
        },
    ];

    return {
        user,
        highest,
        userData,
        totalVotes,
        validId: true,
    };
};

export default withRouter(connect(mapStateToProps)(PollResult));
