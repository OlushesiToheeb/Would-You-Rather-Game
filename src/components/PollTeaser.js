import React from 'react';

import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import '../styles/PollTeaser.scss';

const PollTeaser = ({ question, users }) => {
    return (
        <div className='teaser-body' key={question.id}>
            <div className='teaser-header-div'>
                <h3 className='teaser-header'>
                    {users[question.author].name} asks:
                </h3>
            </div>
            <div className='teaser-inner-div'>
                <div className='teaser-image-div'>
                    <img
                        src={users[question.author].avatarURL}
                        alt={`${users[question.author].name} avatar`}
                        className='teaser-image'
                    />
                </div>
                <div className='teaser-info-div'>
                    <h3 className='teaser-info-header'>Would you rather</h3>
                    <p className='teaser-info'>{question.optionOne.text}...</p>
                    {question.hasLiked ? (
                        <Link to={`/results/${question.id}`}>
                            <Button color={'teal'} fluid>
                                View Result
                            </Button>
                        </Link>
                    ) : (
                        <Link to={`/questions/${question.id}`}>
                            <Button color={'green'} fluid>
                                View Poll
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PollTeaser;
