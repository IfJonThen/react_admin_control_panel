import React, { Component } from 'react';


/*eslint no-useless-constructor:"off",
no-unused-vars: "off",
 no-use-before-define:"off"*/

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
        let cl="button";
        if(this.props.cname!=null) {
             cl+=" " +this.props.cname;
        }
        let defaultStyle={};
        if (this.props.style===undefined){
            defaultStyle={fontSize:"0.7em",marginLeft:"15px",float:"right"};
        }
        else{
            defaultStyle=this.props.style;
        }
        // defaultStyle={fontSize:"0.7em",marginLeft:"15px",float:"right"};
        return (<button className={cl} id={this.props.id} onClick={this.props.onClick}>
                {this.props.value}
                <span style={defaultStyle}>{this.props.sv}</span>

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
export default Button;
