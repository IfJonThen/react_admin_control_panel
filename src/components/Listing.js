import React, { Component } from 'react';
import '../Listing/Listing.css';

class Listing extends Component {
    constructor(){
        super();
    }

    render() {
        return (<button className="btn" onClick={()=> alert(this.props.value)}>
                {this.props.value}
            </button>
        );
    }
}
class ButtonGroup extends Component {
    renderButtons(i){
        return (<Button value={i}/>);
    }
    render() {
        return (<div>
                {this.renderButtons("Jon_Fall 2016")}
                {this.renderButtons("Max_Fall 2016")}
                {this.renderButtons("Gary_Fall 2016")}
        </div>
        );
    }
}

export default ButtonGroup;
