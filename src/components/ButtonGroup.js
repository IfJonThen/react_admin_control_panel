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
        let cl="btn";
        if(this.props.cname!=null) {
             cl+=" " +this.props.cname;
        }
        return (<button className={cl} id={this.props.id} onClick={this.props.onClick}>
                {this.props.value}
                <span style={{fontSize:"0.7em",marginLeft:"20px",float:"right"}}>{this.props.sv}</span>

            </button>
        );
    }
}
class ButtonGroup extends Component {
    constructor(props){
        super(props);

    }
    renderButtons(i,j,k){
        return (<Button cname={k}id={j} value={i}/>);
    }
    render() {
        return (<div>
                {this.renderButtons("Jon_Fall 2016",'jf16',null)}
                {this.renderButtons("Max_Fall 2016",'mf16',null)}
                {this.renderButtons("Gary_Fall 2016",'gf16',null)}
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
