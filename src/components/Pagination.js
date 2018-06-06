import React from 'react';

class Pagination extends React.Component{

    render(){
        return(
            <div className="content-container">
                <div className="pagination">
                    <button onClick={this.props.setUrlFirst}>First</button>
                    <button onClick={this.props.setUrlPrev}>Prev</button>
                    <span>&#8226;</span>
                    <button onClick={this.props.setUrlNext}>Next</button>
                    <button  onClick={this.props.setUrlLast}>Last</button>
                </div>
            </div>
        );
    }
}

export default Pagination;