import React from 'react';

class Pagination extends React.Component{
    render(){
        return(
            <div className="pagination">
                <span onClick={this.props.setUrlLast}>First</span>
                <span onClick={this.props.setUrlLast}>Prev</span>
                <span onClick={this.props.setUrlLast}>Next</span>
                <span onClick={this.props.setUrlLast}>Last</span>
            </div>
        );
    }
}

export default Pagination;