import React, { Component } from 'react';


/*eslint no-useless-constructor:"off",
no-unused-vars: "off"*/

export class Button extends React.Component {
    constructor(props){
        super(props);
        this.id=null;
        this.addValue=this.addValue.bind(this);
    }
    addValue(){
        console.log(this.props.id);
    }
    render() {
        return (<button className="btn" id={this.props.id} onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}
class ButtonGroup extends Component {
    constructor(props){
        super(props);

    }
    renderButtons(i,j){
        return (<Button id={j} value={i}/>);
    }
    render() {
        return (<div>
                {this.renderButtons("Jon_Fall 2016",'jf16')}
                {this.renderButtons("Max_Fall 2016",'mf16')}
                {this.renderButtons("Gary_Fall 2016",'gf16')}
        </div>
        );
    }
}
function addMember(info){
    alert(info);
    // document.getElementById("table").appendChild('<td>temps[info]["quarter"]</td>');
}
function check(){

}
export default ButtonGroup;
