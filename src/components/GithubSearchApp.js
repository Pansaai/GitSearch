import React from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import IssuesList from './IssuesList';

class GithubSearchApp extends React.Component{

    state = {
        issues: []
    };

    onSubmit = ({ owner, repoName }) => {
        console.log(owner, repoName);
        fetch(`https://api.github.com/repos/${owner}/${repoName}/issues`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const issues = data;
                this.setState(() => ({ issues }));
            }). catch((error) => {
                console.log(error);
            });
    }

    render(){
        return(
            <div>
                <Header />
                <SearchForm 
                    onSubmit={this.onSubmit}
                />
                <IssuesList 
                    issues={this.state.issues}
                />
            </div>
        );
    }
}

export default GithubSearchApp;