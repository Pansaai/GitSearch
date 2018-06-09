import React from 'react';

class Pagination extends React.Component{

    render(){
        return(
            <div className="content-container">
                <div className="pagination">
                    <button className="button" disabled={this.props.page < 2} onClick={this.props.first}>First</button>
                    <button className="button" disabled={this.props.page < 2} onClick={this.props.prev}>Prev</button>
                    <span>&#8226;</span>
                    <button className="button" onClick={this.props.next}>Next</button>
                    <button className="button"  onClick={this.props.last}>Last</button>
                </div>
            </div>
        );
    }
}

export default Pagination;