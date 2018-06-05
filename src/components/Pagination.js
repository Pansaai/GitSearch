import React from 'react';

class Pagination extends React.Component{

    render(){
        return(
            <div className="content-container">
                <div className="pagination">
                    <span >First</span>
                    <span >Prev</span>
                    <span>&#8226;</span>
                    <span  onClick={this.props.setUrlNext}>Next</span>
                    <span  onClick={this.props.setUrlLast}>Last</span>
                </div>
            </div>
        );
    }
}

export default Pagination;