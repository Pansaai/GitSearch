import React from 'react';
import IssueListItem from './IssueListItem';

const IssuesList = (props) => (
    <div className="issuesList">
        <div className="content-container">
            {
                props.issues.length === 0 ? (
                    <div className="issuesList__message">
                        <span>No Issues</span>
                    </div>
                ) : (
                    props.issues.map((issue) => {
                        return(
                            <IssueListItem 
                                {...issue}
                                key={issue.id}
                            />
                        );
                    })
                ) 
            }
        </div>
    </div>
);

export default IssuesList;