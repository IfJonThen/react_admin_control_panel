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
export class ButtonGroup extends Component {
    constructor(props){
        super(props);

    }
    renderButtons(className,value,id,style){
        return (<Button cname={className}id={id} value={value} style={style}/>);
    }
    render() {
        let t= null;
        for (let i =0;i<this.props.group;i++) {
            if (t===null){
                t = this.renderButtons(this.props.group[i]["className"], this.props.group[i]["id"], this.props.group[i]["value"], this.props.group[i]["style"]);
            }
            else{
                t += this.renderButtons(this.props.group[i]["className"], this.props.group[i]["id"], this.props.group[i]["value"], this.props.group[i]["style"]);
            }
            }
        return (<div>
                {t}
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
