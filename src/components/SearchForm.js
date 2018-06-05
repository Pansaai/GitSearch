import React from 'react';

class SearchForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            owner: "",
            repoName: ""
        };
    }

    onOwnerChange = (e) => {
        const owner = e.target.value;
        this.setState(() => ({ owner }))
    };

    onRepoNameChange = (e) => {
        const repoName = e.target.value;
        this.setState(() => ({ repoName }))
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            owner: this.state.owner,
            repoName: this.state.repoName
        })
    };

    render(){
        return(
            <div className="searchform" >
                <div className="content-container">
                    <form onSubmit={this.onSubmit} >
                        <input
                            type="text"
                            onChange={this.onOwnerChange}
                            value={this.state.owner}
                            placeholder="Repository Owner"
                            className="input__text"
                        />
                        <input
                            type="text"
                            onChange={this.onRepoNameChange}
                            value={this.state.repoName}
                            placeholder="Repository Name"
                            className="input__text"
                        />
                        <button className="button">Search</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SearchForm;