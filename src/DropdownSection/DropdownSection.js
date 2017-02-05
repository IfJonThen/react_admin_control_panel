import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Button, Panel} from 'react-bootstrap';
import ButtonGroup from './ButtonGroup/ButtonGroup';
import './DropdownSection.css';

var SectionID=0;
class Section extends Component {
    constructor(){
        super();
        this.id=SectionID+1;
        SectionID+=1;
        this.state={};
    }
    render() {
        return (
            <div style={{marginTop:"20px"}}>
                <Button onClick={()=> this.setState({open: !this.state.open})}>
                    {this.props.value}
                </Button>
                <Panel collapsible style={{margin:"10px 0 10px 0"}} expanded={this.state.open}>
                      <div>
                          <div style={{maxWidth:900, height:'auto'}} id={this.id}>
                              {this.props.inside}
                          </div>
                      </div>
                </Panel>
            </div>
        );
    }
}
class DropdownSection extends Component {
    renderSection(i,j){
        return (<Section value={i} inside={j}/>);
    }
    render() {
        return (<div>
                {this.renderSection("Input user")}
                {this.renderSection("Input schedules", <ButtonGroup/>)}
                {this.renderSection("Make comparison")}
        </div>
        );
    }
}
export default DropdownSection;
