import React from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import IssuesList from './IssuesList';
import Pagination from './Pagination';

const getUrl = (owner, repoName, page) => `https://api.github.com/repos/${owner}/${repoName}/issues?page=${page}&per_page=30`;

class GithubSearchApp extends React.Component{

    state = {
        issues: [],
        page: 1,
        owner: '',
        repoName: ''
    };

    //on Submit of the form data -> INITIAL FETCH
    onSubmit = ({ owner, repoName }) => {
        this.fetchIssues(owner, repoName, this.state.page);
        this.setState(() => ({ owner }));
        this.setState(() => ({ repoName }));
    }

    fetchIssues = (owner, repoName, page) => {
        fetch(getUrl(owner, repoName, page))
            .then(response => response.json())
            .then(data => {
                const issues = data;
                this.setState(() => ({ issues }));
            }).catch((error) => {
                console.log(error);
            });
    }

    fetchNext = (owner, repoName) => {
        this.fetchIssues(this.state.owner, this.state.repoName, this.state.page + 1);
        this.setState((prevState) => ({
            page: prevState.page + 1
        }));
    }

    fetchPrev = (owner, repoName) => {
        this.fetchIssues(this.state.owner, this.state.repoName, this.state.page - 1);
        this.setState((prevState) => ({
            page: prevState.page - 1
        }));
    }

    fetchFirst = (owner, repoName) => {
        this.fetchIssues(this.state.owner, this.state.repoName, 1);
        this.setState(() => ({
            page: 1
        }));
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
                    {
                        this.state.issues.length > 0 
                        && 
                        <Pagination 
                            setUrlLast={this.setUrlLast}
                            next={this.fetchNext}
                            first={this.fetchFirst}
                            prev={this.fetchPrev}
                            page={this.state.page}
                        />
                    }
            </div>
        );
    }
}

export default GithubSearchApp;