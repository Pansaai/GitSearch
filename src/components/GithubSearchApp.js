import React from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import IssuesList from './IssuesList';
import Pagination from './Pagination';

class GithubSearchApp extends React.Component{

    state = {
        issues: [],
        last: '',
        next: '',
        url: '',
        owner: '',
        repoName: ''
    };

    onSubmit = ({ owner, repoName }) => {
        fetch(`https://api.github.com/repos/${owner}/${repoName}/issues?page=1&per_page=30`)
            .then(response => {
                let parsedLink = this.parseLinkHeader(response.headers.get('Link'));
                this.setLast(parsedLink);
                this.setNext(parsedLink);
                return response.json();
            })
            .then(data => {
                const issues = data;
                this.setState(() => ({ issues }));
            }). catch((error) => {
                console.log(error);
            });
    }

    parseLinkHeader = (header) => {
        if (header === undefined) {
            throw new Error("input must not be of zero length");
        }
    
        // Split parts by comma
        var parts = header.split(',');
        var links = {};
        // Parse each part into a named link
        for(var i=0; i<parts.length; i++) {
            var section = parts[i].split(';');
            if (section.length !== 2) {
                throw new Error("section could not be split on ';'");
            }
            var url = section[0].replace(/<(.*)>/, '$1').trim();
            var name = section[1].replace(/rel="(.*)"/, '$1').trim();
            links[name] = url;
        }
        return links;
    }

    setLast = (parsedLink) => {
        if(parsedLink.last !== undefined){
            const last = parsedLink.last;
            this.setState(() => ({ last }));
        }
    }

    setUrlLast = (props) => {
        const url = this.state.last;
        this.setState(() => ({ url }));
        this.fetchPagination();
    }

    setNext = (parsedLink) => {
        if(parsedLink.next !== undefined){
            const next = parsedLink.next;
            this.setState(() => ({ next }));
        }
    }

    setUrlNext = (props) => {
        const url = this.state.next;
        this.setState(() => ({ url }));
        this.fetchPagination();
    }

    fetchPagination() {
        fetch(this.state.url)
            .then(response => {
                let parsedLink = this.parseLinkHeader(response.headers.get('Link'));
                this.setLast(parsedLink);
                this.setNext(parsedLink);
                return response.json();
            })
            .then(data => {
                const issues = data;
                this.setState(() => ({ issues }));
            }).catch((error) => {
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
                {
                    this.state.issues.length > 0 && <Pagination 
                                                        setUrlLast={this.setUrlLast} 
                                                        setUrlNext={this.setUrlNext} />
                }
            </div>
        );
    }
}

export default GithubSearchApp;