import React from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import IssuesList from './IssuesList';
import Pagination from './Pagination';
import Loader from './Loader';

const getUrl = (owner, repoName, page) => `https://api.github.com/repos/${owner}/${repoName}/issues?page=${page}&per_page=30`;

class GithubSearchApp extends React.Component{

    state = {
        issues: [],
        page: 1,
        last: null,
        owner: '',
        repoName: '',
        loading: false,
    };

    //on Submit of the form data -> INITIAL FETCH
    onSubmit = ({ owner, repoName }) => {
        this.fetchIssues(owner, repoName, this.state.page);
        this.setState(() => ({ owner }));
        this.setState(() => ({ repoName }));
    }

    //TODO refactor this method
    getLast = (response) => {
        const headerLinks = response.headers.get('Link');
        const links = headerLinks.split(',');
        let last = links[1].match(/\=([\s\S]*?)\&/g);
        last = String(last);
        last = last.slice(1, last.length-1);
        return last;
    }

    fetchIssues = (owner, repoName, page) => {
        if(!this.state.loading){
            this.setState({ loading: true });
        }
        window.scrollTo(0,0);
        fetch(getUrl(owner, repoName, page))
            .then(response => {
                this.setState({ loading: false });
                if(this.state.last === null){
                    const last = this.getLast(response);
                    this.setState(({ last }));
                }
                return response.json();
            })
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

    fetchLast = (owner, repoName) => {
        this.fetchIssues(this.state.owner, this.state.repoName, this.state.last);
        this.setState(() => ({
            page: this.state.last
        }));
    }

    render(){
        return(
            <div>
                <Header />
                    <SearchForm 
                        onSubmit={this.onSubmit}
                    />
                    {
                        this.state.loading ? 
                        <Loader /> :
                        <IssuesList 
                            issues={this.state.issues}
                            loading={this.state.loading}
                        />
                    }
                    {
                        this.state.issues.length > 0 
                        && 
                        <Pagination 
                            last={this.fetchLast}
                            next={this.fetchNext}
                            first={this.fetchFirst}
                            prev={this.fetchPrev}
                            page={this.state.page}
                            lastpage={this.state.last}
                        />
                    }
            </div>
        );
    }
}

export default GithubSearchApp;