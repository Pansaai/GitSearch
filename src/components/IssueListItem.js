import React, { Component } from 'react';

const IssueListItem = ({ title, number, created_at }) => (
    <div className="issuesList__item">
        <p>#{number}</p>
        <h3 className="issuesList__item--title">{title}</h3>
        <p>{created_at}</p>
    </div>
);

export default IssueListItem;