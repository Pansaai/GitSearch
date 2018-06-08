import React from 'react';

class Pagination extends React.Component{

    render(){
        return(
            <div className="content-container">
                <div className="pagination">
                    <button disabled={this.props.page < 2} onClick={this.props.first}>First</button>
                    <button disabled={this.props.page < 2} onClick={this.props.prev}>Prev</button>
                    <span>&#8226;</span>
                    <button onClick={this.props.next}>Next</button>
                    <button  onClick={this.props.setUrlLast}>Last</button>
                </div>
            </div>
        );
    }
}

export default Pagination;