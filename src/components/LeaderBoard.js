import React from 'react';
import { connect } from 'react-redux';
import {
    Segment,
    Header,
    Grid,
    Image,
    Label,
    Divider,
} from 'semantic-ui-react';

const LeaderBoard = ({ leaderboardInfo }) => {
    return (
        <>
            <div className='teaser-body'>
                <div className='teaser-header-div'>
                    <h2 className='teaser-header'>LeaderBoard</h2>
                </div>

                {leaderboardInfo.map((user, index) => (
                    <Segment.Group key={user.id}>
                        <Grid divided padded>
                            <Grid.Row>
                                <Grid.Column width={4} verticalAlign='middle'>
                                    <Image src={user.avatar} />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Header as='h3' textAlign='left'>
                                        {user.name}
                                    </Header>
                                    <Grid>
                                        <Grid.Column width={12}>
                                            Created Questions:
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {user.totalQuestions}
                                        </Grid.Column>
                                    </Grid>
                                    <Divider />
                                    <Grid>
                                        <Grid.Column width={12}>
                                            Answered Questions:
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {user.totalAnswered}
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Row width={4} textAlign='center'>
                                    <Grid>
                                        <Grid.Column width={8}>
                                            Position
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Label color='green' size='big'>
                                                {index + 1}
                                            </Label>
                                        </Grid.Column>
                                    </Grid>
                                    <Divider />
                                    <Grid>
                                        <Grid.Column width={8}>
                                            Total
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Label color='green' size='big'>
                                                {user.totalQuestions +
                                                    user.totalAnswered}
                                            </Label>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Row>
                            </Grid.Row>
                        </Grid>
                    </Segment.Group>
                ))}
            </div>
        </>
    );
};

function mapStateToProps({ users }) {
    const leaderboardInfo = Object.values(users)
        .map((user) => ({
            avatar: user.avatarURL,
            id: user.id,
            name: user.name,
            totalAnswered: Object.values(user.answers).length,
            totalQuestions: user.questions.length,
            total: Object.values(user.answers).length + user.questions.length,
        }))
        .sort((a, b) => b.total - a.total);

    return { leaderboardInfo };
}

export default connect(mapStateToProps)(LeaderBoard);
