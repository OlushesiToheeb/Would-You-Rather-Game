import React from 'react';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PollTeaser from './PollTeaser';

const Dashboard = ({ userQuestionData, users }) => {
    return <Tab panes={panes({ userQuestionData, users })} className='tab' />;
};

const panes = ({ userQuestionData, users }) => [
    {
        menuItem: 'Unanswered Questions',
        render: () => (
            <Tab.Pane attached={false}>
                {userQuestionData?.unansweredQuestions.map((question) => (
                    <PollTeaser
                        key={question.id}
                        question={question}
                        users={users}
                        unAnswered
                    />
                ))}
            </Tab.Pane>
        ),
    },
    {
        menuItem: 'Answered Questions',
        render: () => (
            <Tab.Pane attached={false}>
                {userQuestionData?.answeredQuestions.map((question) => (
                    <PollTeaser
                        key={question.id}
                        question={question}
                        users={users}
                    />
                ))}
            </Tab.Pane>
        ),
    },
];

function mapStateToProps({ authedUser, users, questions }) {
    const user = users[authedUser];
    const sortedQuestion = Object.keys(questions)
        .map((qid) => questions[qid])
        .sort((a, b) => b.timestamp - a.timestamp);
    const answeredQuestionsId = Object.keys(user.answers);
    const unansweredQuestions = sortedQuestion.filter(
        (question) => !answeredQuestionsId.includes(question.id)
    );
    const answeredQuestions = sortedQuestion.filter((question) =>
        answeredQuestionsId.includes(question.id)
    );
    return {
        users,
        userQuestionData: {
            unansweredQuestions,
            answeredQuestions,
        },
    };
}

export default connect(mapStateToProps)(Dashboard);
