import React from 'react';
import { Progress, Label, Icon } from 'semantic-ui-react';

const ResultUI = ({ userData, highest, totalVotes }) => {
    const YourVoteLabel = () => (
        <Label color='green' ribbon='right' className='vote'>
            <Icon
                name='check circle outline'
                size='big'
                className='compact'
                style={{ margin: '0px' }}
            />
        </Label>
    );
    return (
        <>
            {userData.map((option, i) => (
                <div className='result-card' key={i}>
                    {option.userVoted === true && <div>{YourVoteLabel()}</div>}
                    <p>{option.text}</p>
                    <Progress
                        percent={option.percentVote}
                        progress
                        large='true'
                        style={{ margin: 0, width: '100%' }}
                        color={option.noOfVotes === highest ? 'green' : 'grey'}
                    />
                    <p style={{ textAlign: 'center', marginTop: '10px' }}>
                        {option.noOfVotes} out of {totalVotes}
                    </p>
                </div>
            ))}
        </>
    );
};

export default ResultUI;
