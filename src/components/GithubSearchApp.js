import React from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import IssuesList from './IssuesList';
import Pagination from './Pagination';

class GithubSearchApp extends React.Component{

    state = {
        issues: [],
        last: '',
        url: ''
    };

    componentDidUpdate = () => {
        fetch(this.state.url)
            .then(response => {
                let parsedLink = this.parseLinkHeader(response.headers.get('Link'));
                this.setLast(parsedLink);
                return response.json();
            })
            .then(data => {
                const issues = data;
                this.setState(() => ({ issues }));
            }). catch((error) => {
                console.log(error);
            });
    }

    onSubmit = ({ owner, repoName }) => {
        fetch(`https://api.github.com/repos/${owner}/${repoName}/issues?page=1&per_page=30`)
            .then(response => {
                let parsedLink = this.parseLinkHeader(response.headers.get('Link'));
                this.setLast(parsedLink);
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
        if (header.length === 0) {
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

    setUrlLast = () => {
        const url = this.state.last;
        this.setState(() => ({ url }));
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
                    this.state.issues.length > 0 && <Pagination setUrlLast={this.setUrlLast} />
                }
            </div>
        );
    }
}

export default GithubSearchApp;